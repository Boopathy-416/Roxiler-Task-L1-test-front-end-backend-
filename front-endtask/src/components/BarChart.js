import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  if (!data) {
    return <div>No data available for the bar chart</div>;
  }

  const priceRanges = Object.keys(data);
  const values = Object.values(data);

  const barChartData = {
    labels: priceRanges,
    datasets: [
      {
        label: 'Number of Items',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h3>Price Range Bar Chart</h3>
      <Bar data={barChartData} />
    </div>
  );
};

export default BarChart;
