import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema } from '../../lib/validators';
import { courseAPI } from '../../api/courses';
import { useToast } from '../ui/Toast';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export default function CourseForm({ onSuccess }) {
  const { addToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: { title: '', code: '', instructor: '' },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await courseAPI.create(data);
      addToast('Course created successfully', 'success');
      onSuccess();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create course', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Course Title"
        placeholder="e.g. Data Structures"
        {...register('title')}
        error={errors.title?.message}
      />
      <Input
        label="Course Code (optional)"
        placeholder="e.g. CS-201"
        {...register('code')}
        error={errors.code?.message}
      />
      <Input
        label="Instructor (optional)"
        placeholder="e.g. Dr. Smith"
        {...register('instructor')}
        error={errors.instructor?.message}
      />
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create Course'}
      </Button>
    </form>
  );
}