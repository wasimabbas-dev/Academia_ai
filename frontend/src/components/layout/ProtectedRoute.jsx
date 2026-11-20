import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { loading } = useAuth();
  if (loading) return null;
  return <>{children}</>;
}