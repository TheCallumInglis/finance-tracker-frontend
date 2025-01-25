import React from 'react';
import TransactionForm from '../components/TransactionForm';

const TransactionsPage: React.FC = () => {
  return (
    <div>
      <h1>Transactions</h1>
      <TransactionForm />
    </div>
  );
};

export default TransactionsPage;