import React from 'react';

const Statistics = ({ statistics, selectedMonth }) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[selectedMonth - 1];

  return (
    <div className="statistics-box">
      <h1>STATISTICS - {monthName.toUpperCase()}</h1>
      <div>
        <h3>Total Sale Amount: ${statistics.totalAmount || 0}</h3>
        <h3>Total Sold Items: {statistics.totalSoldItems || 0}</h3>
        <h3>Total Not Sold Items: {statistics.totalNotSoldItems || 0}</h3>
      </div>
    </div>
  );
};

export default Statistics;
