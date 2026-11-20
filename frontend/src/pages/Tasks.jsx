import { useTasks } from '../hooks/useTasks';
import TaskItem from '../components/domain/TaskItem';
import { EmptyState } from '../components/ui';

export default function Tasks() {
  const { data, loading, error, refetch } = useTasks();

  if (loading) return <div className="text-center py-10">Loading tasks...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
        <p className="text-gray-600">Manage your assignments and deadlines.</p>
      </div>

      <div className="space-y-3">
        {data.length === 0 ? (
          <EmptyState title="No tasks" subtitle="You're all caught up!" />
        ) : (
          data.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}