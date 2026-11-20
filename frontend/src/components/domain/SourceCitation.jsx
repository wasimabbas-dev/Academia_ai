export default function SourceCitation({ source }) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mt-2 text-sm rounded-r-md">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
          [{source.index}]
        </span>
        {source.page && (
          <span className="text-xs text-gray-500">Page {source.page}</span>
        )}
        <span className="text-xs text-gray-500 truncate max-w-xs">{source.fileName}</span>
      </div>
      <p className="text-gray-700">{source.snippet}</p>
    </div>
  );
}