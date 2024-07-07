import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>Previous</button>
      <span>Page {page}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>Next</button>
      <span>Per Page: 10</span>
    </div>
  );
};

export default Pagination;
