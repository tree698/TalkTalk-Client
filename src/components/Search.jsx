import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const term = e.currentTarget.value;
    setSearchTerm((prev) => term);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      window.alert('Please, enter search term!');
      return;
    }
    navigate('/home/searcheddrawings', { state: { searchTerm } });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={searchTerm}
        placeholder="Search..."
      />
      <button>
        <BsSearch />
      </button>
    </form>
  );
}
