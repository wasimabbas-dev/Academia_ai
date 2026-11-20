import { useState, useEffect } from 'react';
import { taskAPI } from '../api/tasks';

export function useTasks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await taskAPI.list();
      setData(res.data || []);
    } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          setError('Backend is offline. Start the server on port 8080.');
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load tasks');
        }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { data, loading, error, refetch: fetchTasks };
}