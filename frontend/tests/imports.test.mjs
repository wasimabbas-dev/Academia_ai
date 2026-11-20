import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const SRC_ROOT = join(process.cwd(), 'src');
const UI_DIR = join(SRC_ROOT, 'components', 'ui');

// Extract named imports from a source file
function extractNamedImports(filePath) {
  const src = readFileSync(filePath, 'utf-8');
  const lines = src.split('\n');
  const imports = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Match: import { A, B } from './path' or import { A, B } from '../path'
    const m = line.match(/^import\s*\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/);
    if (m) {
      const names = m[1].split(',').map(s => s.trim()).filter(Boolean);
      const fromPath = m[2];
      for (const n of names) {
        const aliasMatch = n.match(/^(\w+)\s+as\s+(\w+)$/);
        const importedName = aliasMatch ? aliasMatch[2] : n;
        imports.push({ name: importedName, line: i + 1, fromPath });
      }
    }

    // Match: import X from './path' (default import)
    const dMatch = line.match(/^import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/);
    if (dMatch) {
      imports.push({ name: dMatch[1], line: i + 1, fromPath: dMatch[2], isDefault: true });
    }
  }

  return imports;
}

// Extract named exports from a source file
function extractNamedExports(filePath) {
  const src = readFileSync(filePath, 'utf-8');
  const lines = src.split('\n');
  const exports = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    const fnMatch = line.match(/^export\s+function\s+(\w+)\s*\(/);
    if (fnMatch) {
      exports.push(fnMatch[1]);
      continue;
    }

    const constMatch = line.match(/^export\s+const\s+(\w+)\s*=/);
    if (constMatch) {
      exports.push(constMatch[1]);
      continue;
    }

    const braceMatch = line.match(/^export\s*\{([^}]+)\}/);
    if (braceMatch) {
      const names = braceMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      for (const n of names) {
        const aliasMatch = n.match(/^(\w+)\s+as\s+(\w+)$/);
        exports.push(aliasMatch ? aliasMatch[2] : n);
      }
    }
  }

  return exports;
}

// Resolve an import path relative to the importing file
function resolveImportPath(fromPath, importingFileDir) {
  const candidates = [
    join(importingFileDir, `${fromPath}.jsx`),
    join(importingFileDir, `${fromPath}.js`),
    join(importingFileDir, fromPath, 'index.jsx'),
    join(importingFileDir, fromPath, 'index.js'),
  ];
  for (const c of candidates) {
    try {
      if (statSync(c).isFile()) return c;
    } catch {}
  }
  return null;
}

// Check if a resolved path is inside the UI directory
function isUiFile(resolvedPath) {
  return resolvedPath.startsWith(UI_DIR + '/') || resolvedPath.startsWith(UI_DIR + '\\');
}

let failures = 0;

// Walk all files under src/
function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

const allFiles = walk(SRC_ROOT);

console.log('=== Import/Export Consistency Audit (ui/ imports only) ===\n');

for (const filePath of allFiles) {
  const relPath = filePath.replace(SRC_ROOT + '/', '');
  const imports = extractNamedImports(filePath);
  const fileDir = dirname(filePath);

  for (const imp of imports) {
    // Skip external packages and absolute paths
    if (!imp.fromPath.startsWith('.')) continue;

    const resolved = resolveImportPath(imp.fromPath, fileDir);
    if (!resolved) {
      // Try resolving from SRC_ROOT for absolute-ish paths like /src/...
      const absResolved = resolveImportPath(imp.fromPath, SRC_ROOT);
      if (!absResolved) continue;
    }
    const targetFile = resolved || resolveImportPath(imp.fromPath, SRC_ROOT);

    // Only check imports that target files inside src/components/ui/
    if (!isUiFile(targetFile)) continue;

    const targetExports = extractNamedExports(targetFile);
    const targetRel = targetFile.replace(SRC_ROOT + '/', '');

    if (imp.isDefault) {
      console.error(`FAIL: ${relPath}:${imp.line} — default import '${imp.name}' from '${targetRel}' but target uses named exports (no \`export default\`)`);
      failures++;
    } else {
      if (!targetExports.includes(imp.name)) {
        console.error(`FAIL: ${relPath}:${imp.line} — named import '{ ${imp.name} }' from '${targetRel}' but target does not export '${imp.name}'`);
        failures++;
      } else {
        console.log(`OK: ${relPath}:${imp.line} — imports { ${imp.name} } from ${targetRel}`);
      }
    }
  }
}

// Summary
console.log(`\n${failures === 0 ? 'PASS' : 'FAIL'}: ${failures} failure(s) in imports audit\n`);
process.exit(failures > 0 ? 1 : 0);