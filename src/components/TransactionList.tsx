import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Transaction from '../interfaces/Transaction';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleDeleteClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const confirmDelete = () => {
    if (selectedTransaction) {
      onDelete(selectedTransaction.id);
      setSelectedTransaction(null);
    }
  };

  return (
    <>
      <List>
        {transactions.map((transaction) => (
          <ListItem
            key={transaction.id}
            divider
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteClick(transaction)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${transaction.merchant}`}
              secondary={`£${parseFloat(transaction.amount).toFixed(2)} | ${new Date(
                transaction.date,
              ).toLocaleDateString()} ${
                transaction.description ? `| ${transaction.description}` : ''
              }`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={!!selectedTransaction} onClose={() => setSelectedTransaction(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this transaction from{' '}
          <strong>{selectedTransaction?.merchant}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTransaction(null)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TransactionList;
