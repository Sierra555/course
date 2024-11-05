import React from 'react';

const SearchFilter = ({ searchTerm, handleSearchChange }) => (
  <div>
    <label htmlFor='search-contact'>Search for a contact</label>
    <input
      id='search-contact'
      name='search-input'
      value={searchTerm}
      onChange={handleSearchChange}
      type='search'
      placeholder='Enter a name'
    />
  </div>
);

export default SearchFilter;
