import { useState } from 'react';
import { useCourses } from '../../hooks/useCourses';
import CourseForm from '../../components/forms/CourseForm';
import CourseCard from '../../components/domain/CourseCard';
import { EmptyState, Button, Modal } from '../../components/ui';

export default function CoursesList() {
  const { data, loading, error, refetch } = useCourses();
  const [showForm, setShowForm] = useState(false);

  if (loading) return <div className="text-center py-10">Loading courses...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <Button onClick={() => setShowForm(true)}>Add Course</Button>
      </div>

      {showForm && (
        <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Add Course</h2>
            <CourseForm onSuccess={() => { setShowForm(false); refetch(); }} />
          </div>
        </Modal>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length === 0 ? (
          <div className="col-span-full">
            <EmptyState title="No courses yet" subtitle="Add your first course to get started." />
          </div>
        ) : (
          data.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        )}
      </div>
    </div>
  );
}