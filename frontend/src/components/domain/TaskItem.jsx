import { Badge } from '../ui/Badge';
import { formatDate } from '../../lib/format';

const typeColors = {
  assignment: 'bg-blue-100 text-blue-700',
  quiz: 'bg-purple-100 text-purple-700',
  exam: 'bg-orange-100 text-orange-700',
};
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
};

export default function TaskItem({ task, onUpdate }) {
  const courseTitle = typeof task.course === 'object' ? task.course.title : task.course || '—';
  return (
    <div className="card flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-gray-900">{task.title}</h4>
        <p className="text-xs text-gray-500">{courseTitle} • {formatDate(task.dueDate)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="default" className={typeColors[task.type] || ''}>
          {task.type}
        </Badge>
        <Badge variant="default" className={statusColors[task.status] || ''}>
          {task.status}
        </Badge>
      </div>
    </div>
  );
}