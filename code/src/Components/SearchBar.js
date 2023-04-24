import React, { useState } from 'react';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
    props.onSearch(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input type="text" id="search" value={searchTerm} onChange={handleChange} />
    </div>
  );
}

export default SearchBar;
