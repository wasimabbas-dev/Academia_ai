import { useParams, useNavigate } from 'react-router-dom';
import { useQuizzes } from '../../hooks/useQuizzes';
import { ProgressBar } from '../../components/ui/ProgressBar';

export default function QuizResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuizzes();

  const quiz = data.find((q) => q._id === id);

  if (loading) return <div className="text-center py-10">Loading results...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!quiz) return <div className="text-center py-10">Quiz not found</div>;

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quiz Results</h1>
        <p className="text-gray-600">{quiz.title}</p>
      </div>

      <div className="card p-8">
        <div className="text-6xl font-bold text-blue-600 mb-2">
          {quiz.score ?? 0}%
        </div>
        <p className="text-gray-600">Your score</p>
        <ProgressBar percentage={quiz.score ?? 0} className="mt-6" />
      </div>

      <button
        onClick={() => navigate('/quizzes')}
        className="btn-primary w-full"
      >
        Back to Quizzes
      </button>
    </div>
  );
}