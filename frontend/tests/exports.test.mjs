import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(process.cwd(), 'src', 'components', 'ui');

// Extract named exports from a source file
function extractNamedExports(filePath) {
  const src = readFileSync(filePath, 'utf-8');
  const lines = src.split('\n');
  const exports = [];

  // Match: export function X, export const X, export { X, Y }, export default
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // export function X(...)
    const fnMatch = line.match(/^export\s+function\s+(\w+)\s*\(/);
    if (fnMatch) {
      exports.push({ name: fnMatch[1], line: i + 1, type: 'function' });
      continue;
    }

    // export const X = ...
    const constMatch = line.match(/^export\s+const\s+(\w+)\s*=/);
    if (constMatch) {
      exports.push({ name: constMatch[1], line: i + 1, type: 'const' });
      continue;
    }

    // export default ...
    const defaultMatch = line.match(/^export\s+default\s+/);
    if (defaultMatch) {
      exports.push({ name: 'default', line: i + 1, type: 'default' });
      continue;
    }

    // export { X, Y } from './...' or export { X, Y }
    const braceMatch = line.match(/^export\s*\{([^}]+)\}/);
    if (braceMatch) {
      const names = braceMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      for (const n of names) {
        // Handle "as" aliasing: export { X as Y }
        const aliasMatch = n.match(/^(\w+)\s+as\s+(\w+)$/);
        if (aliasMatch) {
          exports.push({ name: aliasMatch[2], line: i + 1, type: 'named' });
        } else {
          exports.push({ name: n, line: i + 1, type: 'named' });
        }
      }
    }
  }

  return exports;
}

// Read barrel file and extract what it re-exports
function extractBarrelReexports(barrelPath) {
  const src = readFileSync(barrelPath, 'utf-8');
  const lines = src.split('\n');
  const reexports = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // export { X } from './File';
    const m = line.match(/^export\s*\{([^}]+)\}\s+from\s+['"](\.[\/][^'"]+)['"]/);
    if (m) {
      const names = m[1].split(',').map(s => s.trim()).filter(Boolean);
      const fromPath = m[2];
      for (const n of names) {
        const aliasMatch = n.match(/^(\w+)\s+as\s+(\w+)$/);
        const exportedName = aliasMatch ? aliasMatch[2] : n;
        reexports.push({ name: exportedName, line: i + 1, fromPath });
      }
    }
  }

  return reexports;
}

// Resolve a relative path like './Button' to an actual file
function resolveUiFile(fromPath, barrelDir) {
  const candidates = [
    join(barrelDir, `${fromPath}.jsx`),
    join(barrelDir, `${fromPath}.js`),
    join(barrelDir, fromPath, 'index.jsx'),
    join(barrelDir, fromPath, 'index.js'),
  ];
  for (const c of candidates) {
    try {
      if (statSync(c).isFile()) return c;
    } catch {}
  }
  return null;
}

let failures = 0;
const uiFiles = readdirSync(ROOT).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

// Build a map: filename -> exported names
const fileExports = new Map();
for (const f of uiFiles) {
  const fullPath = join(ROOT, f);
  const exps = extractNamedExports(fullPath);
  fileExports.set(f, exps);
  // Report any default exports found (should be none after standardization)
  for (const e of exps) {
    if (e.type === 'default') {
      console.error(`FAIL: ${f}:${e.line} — uses \`export default\` but should use named exports`);
      failures++;
    }
  }
}

// Verify barrel re-exports match source files
const barrelPath = join(ROOT, 'index.js');
const barrelReexports = extractBarrelReexports(barrelPath);

console.log('=== UI Component Export Audit ===\n');

for (const re of barrelReexports) {
  // Try to find the source file
  const sourceFile = resolveUiFile(re.fromPath, ROOT);
  if (!sourceFile) {
    console.error(`FAIL: index.js:${re.line} — re-exports { ${re.name} } from '${re.fromPath}' but file not found`);
    failures++;
    continue;
  }

  const fileName = sourceFile.split(join(ROOT, '/')).pop() || sourceFile.split('\\').pop();
  const exps = fileExports.get(fileName) || [];
  const found = exps.some(e => e.name === re.name);

  if (!found) {
    console.error(`FAIL: index.js:${re.line} — re-exports { ${re.name} } from '${re.fromPath}' (${fileName}) but ${fileName} does not export '${re.name}'`);
    failures++;
  } else {
    console.log(`OK: index.js re-exports { ${re.name} } from ${fileName}`);
  }
}

// List all named exports found
console.log('\n--- All named exports in ui/ ---');
for (const [f, exps] of fileExports.entries()) {
  const names = exps.map(e => `${e.name} (${e.type})`).join(', ');
  console.log(`${f}: ${names}`);
}

// Summary
console.log(`\n${failures === 0 ? 'PASS' : 'FAIL'}: ${failures} failure(s) in exports audit\n`);
process.exit(failures > 0 ? 1 : 0);