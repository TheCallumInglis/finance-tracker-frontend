import axios from 'axios';
import Account from '../interfaces/Account';
import  CurrentPayPeriod from '../interfaces/CurrentPayPeriod';
import Transaction from '../interfaces/Transaction';

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

export const fetchCurrentPayPeriod = async (): Promise<CurrentPayPeriod | null> => {
  const response = await fetch(`${API_BASE_URL}/payPeriod/current`);
  if (!response.ok) {
    throw new Error('Failed to fetch current pay period');
  }
  return response.json();
}

export const fetchTransactionsForPayPeriod = async (startDate: Date, endDate: Date): Promise<Transaction[]> => {
  const response = await fetch(
    `${API_BASE_URL}/transactions/${startDate}/${endDate}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};

export default api;