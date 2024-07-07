import axios from 'axios';

const API_URL = 'http://localhost:3002/api';  // Ensure this URL matches your backend server

export const fetchTransactions = async (month, searchText, page) => {
  try {
    const response = await axios.get(`${API_URL}/transactions`, {
      params: {
        month,
        search: searchText,
        page,
        perPage: 10
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    throw error;
  }
};

export const fetchStatistics = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/statistics`, {
      params: {
        month
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error.message);
    throw error;
  }
};

export const fetchBarChartData = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/bar-chart-data`, {
      params: {
        month
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bar chart data:', error.message);
    throw error;
  }
};

export const fetchCombinedData = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/combined-data`, {
      params: {
        month
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching combined data:', error.message);
    throw error;
  }
};
