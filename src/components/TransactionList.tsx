import { List, ListItem, ListItemText } from '@mui/material';
import Transaction from '../interfaces/Transaction';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <List>
      {transactions.map((transaction) => (
        <ListItem key={transaction.id} divider>
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
  );
};

export default TransactionList;
