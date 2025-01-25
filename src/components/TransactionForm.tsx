import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Stack, CircularProgress, InputAdornment } from '@mui/material';
import dayjs from 'dayjs';
import { useTransactionCategories } from '../hooks/useTransactionCategories';
import { useAccounts } from '../hooks/useAccounts';
import AmountRegex from '../utils/AmountRegex';

const TransactionForm: React.FC = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useTransactionCategories();
  const { accounts, defaultAccount, loading: accountsLoading, error: accountsError } = useAccounts();

  const initialFormData = {
    date: dayjs().format('YYYY-MM-DD'),
    account: defaultAccount ? defaultAccount.id : '',
    amount: '',
    merchant: '',
    category: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (defaultAccount) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        account: defaultAccount.id.toString(),
      }));
    }
  }, [defaultAccount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'amount' && !e.target.value.match(AmountRegex)) {
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'amount') {
      setFormData({
        ...formData,
        amount: parseFloat(formData.amount || '0').toFixed(2),
      });
    } 
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
        setFormData(initialFormData);
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
        {accountsLoading ? (
          <CircularProgress />
        ) : accountsError ? (
          <p style={{ color: 'red' }}>{accountsError}</p>
        ) : (
          <TextField
            label="Bank Account"
            name="account"
            value={formData.account}
            onChange={handleChange}
            select
            fullWidth
            required
          >
            {accounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          label="Amount"
          name="amount"
          type="text"
          value={formData.amount}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          required
          slotProps={{
            input: {
              startAdornment: <span style={{ marginRight: '8px' }}>£</span>,
              placeholder: '0.00',
            },
          }}
          inputProps={{ // deprecated but works in ios
            pattern: AmountRegex, //'[0-9]*[.]?[0-9]{2}',
            inputMode: 'decimal',
          }}
        />
        <TextField
          label="Merchant"
          name="merchant"
          value={formData.merchant}
          onChange={handleChange}
          fullWidth
          required
        />
        {categoriesLoading ? (
          <CircularProgress />
        ) : categoriesError ? (
          <p style={{ color: 'red' }}>{categoriesError}</p>
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
        <Button variant="contained" type="submit" {...{ 
            disabled: (
              categoriesLoading 
              || accountsLoading 
              || categoriesError !== null 
              || accountsError !== null
            ) 
          }}>
          Add Transaction
        </Button>
      </Stack>
    </form>
  );
};

export default TransactionForm;