import React, { useState } from 'react';
import { TextField, Button, MenuItem, Stack, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { useTransactionCategories } from '../hooks/useTransactionCategories';

const TransactionForm: React.FC = () => {
  const { categories, loading, error } = useTransactionCategories();

  const [formData, setFormData] = useState({
    date: dayjs().format('YYYY-MM-DD'),
    amount: '',
    merchant: '',
    category: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.merchant || !formData.category) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Transaction added successfully!');
        setFormData({ date: dayjs().format('YYYY-MM-DD'), amount: '', merchant: '', category: '', description: '' });
      } else {
        alert('Failed to add transaction');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Merchant"
          name="merchant"
          value={formData.merchant}
          onChange={handleChange}
          fullWidth
          required
        />
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            select
            fullWidth
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          label="Description (Optional)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" type="submit" {...{ disabled: (loading || error !== null) }}>
          Add Transaction
        </Button>
      </Stack>
    </form>
  );
};

export default TransactionForm;