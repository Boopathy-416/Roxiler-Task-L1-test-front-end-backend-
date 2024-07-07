import React, { useState, useEffect } from 'react';
import Dropdown from './components/DropDown';
import SearchBox from './components/SearchBox';
import Table from './components/Table';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import Pagination from './components/Pagination';
import { fetchTransactions, fetchStatistics, fetchBarChartData } from './api';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [searchText, setSearchText] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch transactions
      const transactionsData = await fetchTransactions(selectedMonth, searchText, page);
      setTransactions(transactionsData.transactions);
      setTotalPages(Math.ceil(transactionsData.total / 10));

      // Fetch statistics
      const statisticsData = await fetchStatistics(selectedMonth);
      setStatistics(statisticsData);

      // Fetch bar chart data
      const barChartData = await fetchBarChartData(selectedMonth);
      setBarChartData(barChartData);
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data:', error.message);
    }
  };

  fetchData();
}, [selectedMonth, searchText, page]);

if (error) {
  return <div>{error}</div>;
}

return (
  <div className="app-container">
    <header className="app-header">
      <h3>Transaction Dashboard</h3>
    </header>
    <main className="app-main">
      <div className="filters">
        <SearchBox searchText={searchText} onSearchChange={setSearchText} />
        <Dropdown selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
      </div>
      <Table transactions={transactions} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <Statistics statistics={statistics} selectedMonth={selectedMonth} />
      <BarChart data={barChartData} />
    </main>
      <p>Copyright (c) 2024 Boopathy</p>
  </div>
);
};

export default App;