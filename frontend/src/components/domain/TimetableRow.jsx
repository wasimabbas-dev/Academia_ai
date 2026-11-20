import { Badge } from '../ui/Badge';

export default function TimetableRow({ entry }) {
  const courseTitle = typeof entry.course === 'object' ? entry.course.title : entry.course || '—';
  return (
    <div className="card flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-gray-900">{entry.day}</h4>
        <p className="text-xs text-gray-500">{entry.startTime} – {entry.endTime} • {courseTitle}</p>
        {entry.room && <p className="text-xs text-gray-500">Room: {entry.room}</p>}
      </div>
      <Badge variant="info">{entry.day}</Badge>
    </div>
  );
}