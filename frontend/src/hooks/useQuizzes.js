import { useState, useEffect } from 'react';
import { quizAPI } from '../api/quizzes';

export function useQuizzes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const res = await quizAPI.list();
      setData(res.data || []);
    } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          setError('Backend is offline. Start the server on port 8080.');
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load quizzes');
        }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return { data, loading, error, refetch: fetchQuizzes };
}