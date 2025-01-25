import { useState, useEffect } from 'react';
import { fetchTransactionCategories } from '../services/api';

export const useTransactionCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchTransactionCategories();
        setCategories(data.map((category: { name: string }) => category.name));
      } catch (err) {
        setError('Error loading categories');
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return { categories, loading, error };
};