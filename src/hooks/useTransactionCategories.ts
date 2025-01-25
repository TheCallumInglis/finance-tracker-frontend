import { useState, useEffect } from 'react';
import { fetchTransactionCategories } from '../services/api';
import TransactionCategory from '../interfaces/TransactionCategory';

export const useTransactionCategories = () => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchTransactionCategories();
        setCategories(data);
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