import { useState, useEffect } from 'react';
import { getIndustries } from '../services/onboardingService';

export function useIndustries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchIndustriesData = async () => {
      try {
        setLoading(true);
        const data = await getIndustries();
        if (isMounted) {
          setIndustries(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch industries:', err);
          setError(err.response?.data?.message || 'Failed to load industries. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchIndustriesData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { industries, loading, error };
}