import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../lib/format';

export default function QuizCard({ quiz }) {
  return (
    <Link to={`/quizzes/${quiz._id}/attempt`} className="card hover:shadow-md transition-shadow cursor-pointer">
      <h3 className="text-lg font-bold text-gray-900">{quiz.title}</h3>
      <p className="text-sm text-gray-500 mb-3">
        {quiz.course && typeof quiz.course === 'object'
          ? quiz.course.title || quiz.course.code
          : 'Course'}
      </p>
      <div className="flex items-center justify-between">
        <Badge variant={quiz.status === 'completed' ? 'success' : 'default'}>
          {quiz.status}
        </Badge>
        {quiz.score !== undefined && <span className="text-sm font-medium">{quiz.score}%</span>}
      </div>
    </Link>
  );
}