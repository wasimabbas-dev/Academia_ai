import { Badge } from '../ui/Badge';

export default function MaterialCard({ material }) {
  return (
    <div className="card flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-gray-900">{material.fileName}</h4>
        <p className="text-xs text-gray-500">{material.chunkCount} chunks processed</p>
      </div>
      <Badge variant="info">Ready</Badge>
    </div>
  );
}