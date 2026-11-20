import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  code: z.string().optional(),
  instructor: z.string().optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['assignment', 'quiz', 'exam'], { required_error: 'Type is required' }),
  dueDate: z.string().min(1, 'Due date is required'),
  course: z.string().min(1, 'Course is required'),
});

export const timetableSchema = z.object({
  course: z.string().min(1, 'Course is required'),
  day: z.string().min(1, 'Day is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  room: z.string().optional(),
});

export const quizSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  course: z.string().min(1, 'Course is required'),
});

export const ragSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  courseId: z.string().min(1, 'Course is required'),
});