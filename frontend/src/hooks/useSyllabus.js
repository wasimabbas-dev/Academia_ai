import { useState, useEffect } from 'react';
import { syllabusAPI } from '../api/syllabus';

export function useSyllabus(courseId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;
    const fetchSyllabus = async () => {
      try {
        setLoading(true);
        const res = await syllabusAPI.getByCourse(courseId);
        setData(res.data);
      } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          setError('Backend is offline. Start the server on port 8080.');
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load syllabus');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabus();
  }, [courseId]);

  return { data, loading, error };
}