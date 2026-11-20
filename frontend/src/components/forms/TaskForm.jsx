import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '../../lib/validators';
import { taskAPI } from '../../api/tasks';
import { useToast } from '../ui/Toast';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export default function TaskForm({ courses, onSuccess }) {
  const { addToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: '', type: 'assignment', dueDate: '', course: '' },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await taskAPI.create(data);
      addToast('Task created successfully', 'success');
      onSuccess();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create task', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Task Title"
        placeholder="e.g. Assignment 1"
        {...register('title')}
        error={errors.title?.message}
      />
      <Select
        label="Type"
        options={[
          { value: 'assignment', label: 'Assignment' },
          { value: 'quiz', label: 'Quiz' },
          { value: 'exam', label: 'Exam' },
        ]}
        {...register('type')}
        error={errors.type?.message}
      />
      <Input
        label="Due Date"
        type="date"
        {...register('dueDate')}
        error={errors.dueDate?.message}
      />
      <Select
        label="Course"
        options={courses.map((c) => ({ value: c._id, label: c.title || c.code || 'Course' }))}
        {...register('course')}
        error={errors.course?.message}
      />
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create Task'}
      </Button>
    </form>
  );
}