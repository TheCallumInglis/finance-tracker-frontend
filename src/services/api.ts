import axios from 'axios';
import Account from '../interfaces/Account';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTransactionCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/transactions/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch transaction categories');
  }
  return response.json();
};

export const fetchAccounts = async (): Promise<Account[]> => {
  const response = await fetch(`${API_BASE_URL}/accounts`);
  if (!response.ok) {
    throw new Error('Failed to fetch accounts');
  }
  return response.json();
};

export default api;