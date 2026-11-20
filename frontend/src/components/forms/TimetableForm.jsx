import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { timetableSchema } from '../../lib/validators';
import { timetableAPI } from '../../api/timetable';
import { useToast } from '../ui/Toast';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export default function TimetableForm({ courses, onSuccess }) {
  const { addToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(timetableSchema),
    defaultValues: { course: '', day: 'Monday', startTime: '09:00', endTime: '10:30', room: '' },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await timetableAPI.create(data);
      addToast('Timetable entry created', 'success');
      onSuccess();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create entry', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select
        label="Course"
        options={courses.map((c) => ({ value: c._id, label: c.title || c.code || 'Course' }))}
        {...register('course')}
        error={errors.course?.message}
      />
      <Select
        label="Day"
        options={days.map((d) => ({ value: d, label: d }))}
        {...register('day')}
        error={errors.day?.message}
      />
      <Input label="Start Time" type="time" {...register('startTime')} error={errors.startTime?.message} />
      <Input label="End Time" type="time" {...register('endTime')} error={errors.endTime?.message} />
      <Input label="Room (optional)" placeholder="e.g. Room 101" {...register('room')} error={errors.room?.message} />
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Add Entry'}
      </Button>
    </form>
  );
}