import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Layout
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import CoursesList from './pages/Courses/CoursesList';
import CourseDetails from './pages/Courses/CourseDetails';
import Tasks from './pages/Tasks';
import Timetable from './pages/Timetable';
import MaterialsList from './pages/Materials/MaterialsList';
import UploadMaterial from './pages/Materials/UploadMaterial';
import AskAI from './pages/AskAI';
import QuizzesList from './pages/Quizzes/QuizzesList';
import QuizAttempt from './pages/Quizzes/QuizAttempt';
import QuizResults from './pages/Quizzes/QuizResults';
import Settings from './pages/Settings';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/auth/NotFound';

function App() {
  const { user, loading } = useAuth();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!loading) setInitialized(true);
  }, [loading]);

  if (!initialized) return null;

  return (
    <Routes>
      {/* Auth (public) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected app shell */}
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/materials" element={<MaterialsList />} />
        <Route path="/materials/upload" element={<UploadMaterial />} />
        <Route path="/ask" element={<AskAI />} />
        <Route path="/quizzes" element={<QuizzesList />} />
        <Route path="/quizzes/:id/attempt" element={<QuizAttempt />} />
        <Route path="/quizzes/:id/results" element={<QuizResults />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Redirects */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;