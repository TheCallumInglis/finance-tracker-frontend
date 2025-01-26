import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTransactionsPage from './pages/AddTransactionsPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/transactions/new" element={<AddTransactionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;