import { useState, useEffect } from 'react';
import { timetableAPI } from '../api/timetable';

export function useTimetable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await timetableAPI.list();
      setData(res.data || []);
    } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          setError('Backend is offline. Start the server on port 8080.');
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load timetable');
        }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return { data, loading, error, refetch: fetchEntries };
}