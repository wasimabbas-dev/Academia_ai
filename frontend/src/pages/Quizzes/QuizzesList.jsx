import { useQuizzes } from '../../hooks/useQuizzes';
import QuizCard from '../../components/domain/QuizCard';
import { EmptyState } from '../../components/ui';

export default function QuizzesList() {
  const { data, loading, error, refetch } = useQuizzes();

  if (loading) return <div className="text-center py-10">Loading quizzes...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quizzes</h1>
        <p className="text-gray-600">Take and review your quizzes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length === 0 ? (
          <div className="col-span-full">
            <EmptyState title="No quizzes" subtitle="No quizzes available yet." />
          </div>
        ) : (
          data.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))
        )}
      </div>
    </div>
  );
}