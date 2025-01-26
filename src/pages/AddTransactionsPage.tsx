import React from 'react';
import TransactionForm from '../components/TransactionForm';
import { Container, Typography } from '@mui/material';

const AddTransactionsPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        New Transaction
      </Typography>

      <TransactionForm />
    </Container>
  );
};

export default AddTransactionsPage;