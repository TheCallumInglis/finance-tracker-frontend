import { useState, useEffect } from 'react';
import { fetchAccounts } from '../services/api';
import Account from '../interfaces/Account';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [defaultAccount, setDefaultAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const data = await fetchAccounts();
        setAccounts(data);

        if (data.length > 0) {
            setDefaultAccount(data.find((acc) => acc.isDefault) || data[0]);
        }
      } catch (err) {
        setError('Error loading accounts');
      } finally {
        setLoading(false);
      }
    };

    getAccounts();
  }, []);

  return { accounts, defaultAccount, loading, error };
};