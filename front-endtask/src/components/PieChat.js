import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register the components required for the chart
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const PieChart = ({ pieChartData }) => {
  const data = {
    labels: Object.keys(pieChartData),
    datasets: [
      {
        data: Object.values(pieChartData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A', '#46BFBD'],
        hoverOffset: 4
      }
    ]
  };

  return <Pie data={data} />;
};

export default PieChart;
