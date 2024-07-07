import React from 'react';

const SearchBox = ({ searchText, onSearchChange }) => {
  return (
    <input
      type="text"
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search transactions"
    />
  );
};

export default SearchBox;
