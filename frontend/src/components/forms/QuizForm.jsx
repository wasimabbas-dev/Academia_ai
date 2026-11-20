import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizSchema } from '../../lib/validators';
import { quizAPI } from '../../api/quizzes';
import { useToast } from '../ui/Toast';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export default function QuizForm({ courses, onSuccess }) {
  const { addToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: { title: '', course: '' },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await quizAPI.create(data);
      addToast('Quiz created successfully', 'success');
      onSuccess();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create quiz', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Quiz Title"
        placeholder="e.g. Midterm Quiz"
        {...register('title')}
        error={errors.title?.message}
      />
      <Select
        label="Course"
        options={courses.map((c) => ({ value: c._id, label: c.title || c.code || 'Course' }))}
        {...register('course')}
        error={errors.course?.message}
      />
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create Quiz'}
      </Button>
    </form>
  );
}