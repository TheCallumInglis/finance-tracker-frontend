import { useState, useEffect } from 'react';
import { fetchCurrentPayPeriod, fetchTransactionsForPayPeriod } from '../services/api';
import Transaction from '../interfaces/Transaction';
import CurrentPayPeriod from '../interfaces/CurrentPayPeriod';

export const useDashboardData = () => {
  const emptyPayPeriod: CurrentPayPeriod = {
    id: 0,
    startDate: new Date(),
    endDate: new Date(),
    daysTotal: 0,
    daysElapsed: 0,
    daysRemaining: 0,
    budget: 0,
    budgetPerDay: 0,
    spendTotal: 0,
    spendAvgPerDay: 0,
    remainingBudget: 0,
    remainingBudgetPerDay: 0
  };

  const [payPeriod, setPayPeriod] = useState(emptyPayPeriod as CurrentPayPeriod);
  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [isOverBudget, setIsOverBudget] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteTransaction = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTransactions(transactions.filter((transaction) => transaction.id !== id));
      } else {
        alert('Failed to delete transaction.');
      }
    } catch (err) {
      console.error('Error deleting transaction:', err);
      alert('Something went wrong.');
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const payPeriodData = await fetchCurrentPayPeriod();

        if (!payPeriodData) {
            setPayPeriod(emptyPayPeriod);
            throw new Error("Failed to load current pay period data.");
        }

        setPayPeriod(payPeriodData);

        const transactions = await fetchTransactionsForPayPeriod(payPeriodData.startDate, payPeriodData.endDate);
        setTransactions(transactions);

        setIsOverBudget(payPeriodData.spendTotal > (payPeriodData.daysElapsed * payPeriodData.budgetPerDay));
      } catch (err) {
        console.log(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { payPeriod, transactions, isOverBudget, handleDeleteTransaction, loading, error };
};