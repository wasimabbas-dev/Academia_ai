import { useParams } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';
import CourseCard from '../../components/domain/CourseCard';
import { useTaskForm } from '../../hooks/useTaskForm';
import TaskForm from '../../components/forms/TaskForm';
import { EmptyState } from '../../components/ui';

export default function CourseDetails() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useCourses();
  const { openTaskForm, taskFormOpen, closeTaskForm } = useTaskForm();

  const course = data.find((c) => c._id === id);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!course) return <div className="text-center py-10">Course not found</div>;

  const tasks = course.tasks || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600">{course.code || 'No code'}</p>
        </div>
        <button onClick={() => openTaskForm()} className="btn-primary">Add Task</button>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">Tasks ({tasks.length})</h3>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <EmptyState title="No tasks" subtitle="Add a task for this course." />
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="card p-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-sm text-gray-500">{task.type} • Due {task.dueDate}</p>
              </div>
              <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {task.status}
              </span>
            </div>
          ))
        )}
      </div>

      {taskFormOpen && (
        <div className="max-w-md">
          <TaskForm courses={[course]} onSuccess={() => { closeTaskForm(); refetch(); }} />
        </div>
      )}
    </div>
  );
}