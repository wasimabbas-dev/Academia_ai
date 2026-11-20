import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/format';
import { Badge } from '../ui/Badge';

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course._id}`} className="card hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <Badge variant="info">{course.code || '—'}</Badge>
        <Badge variant="success">{course.materialCount || 0} materials</Badge>
      </div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{course.title}</h3>
      {course.instructor && (
        <p className="text-sm text-gray-500 mb-3">Instructor: {course.instructor}</p>
      )}
      <div className="text-xs text-gray-500">
        Created: {formatDate(course.createdAt)}
      </div>
    </Link>
  );
}