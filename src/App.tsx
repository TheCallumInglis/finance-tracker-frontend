import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTransactionsPage from './pages/AddTransactionsPage';
import DashboardPage from './pages/DashboardPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions/new" element={<AddTransactionsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
