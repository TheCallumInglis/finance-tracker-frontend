import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Stack, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { useTransactionCategories } from '../hooks/useTransactionCategories';
import { useAccounts } from '../hooks/useAccounts';
import AmountRegex from '../utils/AmountRegex';

const TransactionForm: React.FC = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useTransactionCategories();
  const { accounts, defaultAccount, loading: accountsLoading, error: accountsError } = useAccounts();

  const initialFormData = {
    date: dayjs().format('YYYY-MM-DD'),
    accountId: defaultAccount ? defaultAccount.id : '',
    amount: '',
    merchant: '',
    transactionCategoryId: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (defaultAccount) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        accountId: defaultAccount.id.toString(),
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
        amount: (formData.amount === "" 
          ? "" 
          : parseFloat(formData.amount || '0').toFixed(2)
      ),
      });
    } 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accountId || !formData.amount || !formData.merchant || !formData.transactionCategoryId) {
      alert('Please fill all required fields');
      return;
    }

    const formattedData = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      amount: parseFloat(formData.amount),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
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
    <form>
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
            name="accountId"
            value={formData.accountId}
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
            pattern: AmountRegex,
            inputMode: 'decimal',
            onInvalid: (e) => e.preventDefault(),
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
            name="transactionCategoryId"
            value={formData.transactionCategoryId}
            onChange={handleChange}
            select
            fullWidth
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
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
        <Button variant="contained" type="submit" 
          onClick={handleSubmit}
          {...{ 
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