import { useState, useEffect } from 'react';
import { dashboardAPI } from '../api/dashboard';

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await dashboardAPI.stats();
        setData(res.data);
      } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          setError('Backend is offline. Start the server on port 8080.');
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load stats');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { data, loading, error };
}