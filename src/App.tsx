import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionsPage from './pages/TransactionsPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;