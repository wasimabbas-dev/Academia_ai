import { useState, useEffect } from 'react';
import { courseAPI } from '../api/courses';

export function useCourses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await courseAPI.list();
      setData(res.data || []);
    } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          setError('Backend is offline. Start the server on port 8080.');
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load courses');
        }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { data, loading, error, refetch: fetchCourses };
}