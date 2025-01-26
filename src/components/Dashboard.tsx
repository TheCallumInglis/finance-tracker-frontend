import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '../hooks/useDashboardData';
import SummaryCard from './SummaryCard';
import TransactionList from './TransactionList';
import ProgressBar from './ProgressBar';
import { CircularProgress, Typography, Container, Grid2, Button } from '@mui/material';
import { formatDate } from '../utils/DateUtils';

const Dashboard: React.FC = () => {
  const { payPeriod, transactions, isOverBudget, handleDeleteTransaction, loading, error } =
    useDashboardData();
  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Grid2 container spacing={2} marginTop={2} marginBottom={2} alignItems="flex-end">
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Typography variant="h5" display={'inline'}>
            Period:
          </Typography>
          <Typography variant="h5" display={'inline'} marginLeft={1}>
            {formatDate(new Date(payPeriod.startDate))} - {formatDate(new Date(payPeriod.endDate))}
          </Typography>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} marginBottom={2}>
        <Grid2 size={{ xs: 6, md: 4, lg: 3 }}>
          <SummaryCard title="Period Budget" value={`£${payPeriod.budget.toFixed(2)}`} />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4, lg: 3 }}>
          <SummaryCard
            title={isOverBudget ? 'Over Budget' : 'Under Budget'}
            value={
              isOverBudget
                ? `£${(
                    payPeriod.spendTotal -
                    payPeriod.budgetPerDay * payPeriod.daysElapsed
                  ).toFixed(2)}`
                : `£${(
                    payPeriod.budgetPerDay * payPeriod.daysElapsed -
                    payPeriod.spendTotal
                  ).toFixed(2)}`
            }
            flag={isOverBudget}
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4, lg: 3 }}>
          <SummaryCard title="Daily Budget" value={`£${payPeriod.budgetPerDay.toFixed(2)}`} />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4, lg: 3 }}>
          <SummaryCard
            title="Days Elapsed"
            value={`${payPeriod.daysElapsed} of ${payPeriod.daysTotal}`}
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} marginBottom={2}>
        <Grid2 size={{ xs: 12 }}>
          <Typography variant="h6" display={'inline'}>
            Current Spend
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4, lg: 3 }}>
          <SummaryCard title="Spent to date" value={`£${payPeriod.spendTotal.toFixed(2)}`} />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4, lg: 3 }}>
          <SummaryCard
            title="Daily Avg."
            value={`£${payPeriod.spendAvgPerDay.toFixed(2)}`}
            flag={isOverBudget}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
          <ProgressBar value={payPeriod.spendTotal} maxValue={payPeriod.budget} />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} marginBottom={2}>
        <Grid2 size={{ xs: 12 }}>
          <Typography variant="h6" display={'inline'}>
            Remaining Budget
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4, lg: 3 }}>
          <SummaryCard title="For Period" value={`£${payPeriod.remainingBudget.toFixed(2)}`} />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4, lg: 3 }}>
          <SummaryCard
            title="Per Day"
            value={`£${payPeriod.remainingBudgetPerDay.toFixed(2)}`}
            flag={isOverBudget}
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/transactions/new')}
          >
            Add Transaction
          </Button>
        </Grid2>

        <Grid2 size={{ xs: 4, md: 4 }}></Grid2>
      </Grid2>

      <Typography variant="h5" marginTop={2}>
        Recent Transactions
      </Typography>
      <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
    </Container>
  );
};

export default Dashboard;
