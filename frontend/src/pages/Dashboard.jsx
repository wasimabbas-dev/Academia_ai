import { useDashboard } from '../hooks/useDashboard';
import { formatDate } from '../lib/format';
import { Card, Badge } from '../components/ui';

export default function Dashboard() {
  const { data, loading, error } = useDashboard();

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  const stats = data || {
    totalCourses: 0,
    totalTasks: 0,
    totalQuizzes: 0,
    completedQuizzes: 0,
    averageScore: 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back to your academic hub.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-gray-500">Total Courses</h3>
          <div className="text-3xl font-bold mt-2">{stats.totalCourses}</div>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
          <div className="text-3xl font-bold mt-2">{stats.totalTasks}</div>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-gray-500">Quizzes Completed</h3>
          <div className="text-3xl font-bold mt-2">{stats.completedQuizzes}</div>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
          <div className="text-3xl font-bold mt-2">{stats.averageScore}%</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Stats</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Courses</span>
              <span className="font-medium">{stats.totalCourses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasks</span>
              <span className="font-medium">{stats.totalTasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quizzes</span>
              <span className="font-medium">{stats.totalQuizzes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed</span>
              <span className="font-medium text-green-600">{stats.completedQuizzes}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}