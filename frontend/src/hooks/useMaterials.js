import { useState, useEffect } from 'react';
import { materialAPI } from '../api/materials';

export function useMaterials() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await materialAPI.list();
      setData(res.data || []);
    } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          setError('Backend is offline. Start the server on port 8080.');
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load materials');
        }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return { data, loading, error, refetch: fetchMaterials };
}