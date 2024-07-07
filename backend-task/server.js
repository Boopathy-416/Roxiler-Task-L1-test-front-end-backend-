const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  // Add this line

const app = express();
const PORT = process.env.PORT || 3002;

// Use cors middleware to allow requests from the frontend
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define the API base URL
const API_BASE_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

// API to initialize the database
app.get('/initialize', async (req, res) => {
  try {
    const response = await axios.get(API_BASE_URL);
    // Your database initialization logic
    // For example:
    // await Transaction.deleteMany({});
    // await Transaction.insertMany(response.data);
    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from the third-party API' });
  }
});

// API to list all transactions
app.get('/api/transactions', async (req, res) => {
  const { month = 3, search = '', page = 1, perPage = 10 } = req.query;
  const searchText = search.trim().toLowerCase();
  try {
    // Fetch the transactions data from the third-party API
    const { data: transactions } = await axios.get(API_BASE_URL);
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
      const matchesMonth = transactionMonth === Number(month);
      const matchesSearch =
        transaction.title.toLowerCase().includes(searchText) ||
        transaction.description.toLowerCase().includes(searchText) ||
        transaction.price.toString().includes(searchText);
      return matchesMonth && matchesSearch;
    });

    const paginatedTransactions = filteredTransactions.slice((page - 1) * perPage, page * perPage);

    res.json({
      transactions: paginatedTransactions,
      total: filteredTransactions.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// API for statistics
app.get('/api/statistics', async (req, res) => {
  const { month = 3 } = req.query;
  try {
    // Fetch the transactions data from the third-party API
    const { data: transactions } = await axios.get(API_BASE_URL);
    const filteredTransactions = transactions.filter(
      (transaction) => new Date(transaction.dateOfSale).getMonth() + 1 === Number(month)
    );

    const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSoldItems = filteredTransactions.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = filteredTransactions.filter(transaction => !transaction.sold).length;

    res.json({
      totalAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// API for bar chart data
app.get('/api/bar-chart-data', async (req, res) => {
  const { month = 3 } = req.query;
  try {
    // Fetch the transactions data from the third-party API
    const { data: transactions } = await axios.get(API_BASE_URL);
    const filteredTransactions = transactions.filter(
      (transaction) => new Date(transaction.dateOfSale).getMonth() + 1 === Number(month)
    );

    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0,
    };

    filteredTransactions.forEach((transaction) => {
      if (transaction.price <= 100) {
        priceRanges['0-100']++;
      } else if (transaction.price <= 200) {
        priceRanges['101-200']++;
      } else if (transaction.price <= 300) {
        priceRanges['201-300']++;
      } else if (transaction.price <= 400) {
        priceRanges['301-400']++;
      } else if (transaction.price <= 500) {
        priceRanges['401-500']++;
      } else if (transaction.price <= 600) {
        priceRanges['501-600']++;
      } else if (transaction.price <= 700) {
        priceRanges['601-700']++;
      } else if (transaction.price <= 800) {
        priceRanges['701-800']++;
      } else if (transaction.price <= 900) {
        priceRanges['801-900']++;
      } else {
        priceRanges['901-above']++;
      }
    });

    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bar chart data' });
  }
});

// API for combined data
app.get('/api/combined-data', async (req, res) => {
  const { month = 3 } = req.query;
  try {
    // Fetch the transactions data from the third-party API
    const { data: transactions } = await axios.get(API_BASE_URL);
    const filteredTransactions = transactions.filter(
      (transaction) => new Date(transaction.dateOfSale).getMonth() + 1 === Number(month)
    );

    const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSoldItems = filteredTransactions.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = filteredTransactions.filter(transaction => !transaction.sold).length;

    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0,
    };

    filteredTransactions.forEach((transaction) => {
      if (transaction.price <= 100) {
        priceRanges['0-100']++;
      } else if (transaction.price <= 200) {
        priceRanges['101-200']++;
      } else if (transaction.price <= 300) {
        priceRanges['201-300']++;
      } else if (transaction.price <= 400) {
        priceRanges['301-400']++;
      } else if (transaction.price <= 500) {
        priceRanges['401-500']++;
      } else if (transaction.price <= 600) {
        priceRanges['501-600']++;
      } else if (transaction.price <= 700) {
        priceRanges['601-700']++;
      } else if (transaction.price <= 800) {
        priceRanges['701-800']++;
      } else if (transaction.price <= 900) {
        priceRanges['801-900']++;
      } else {
        priceRanges['901-above']++;
      }
    });

    res.json({
      statistics: {
        totalAmount,
        totalSoldItems,
        totalNotSoldItems,
      },
      barChartData: priceRanges,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
