import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import styles from './searchFeature.module.css';

const SearchFeature = ({ onSendSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const inputRef = useRef();

  const onChange = (event) => {
    const term = event.currentTarget.value;
    setSearchTerm(term);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    searchTerm
      ? onSendSearchTerm(searchTerm)
      : window.alert('Please, enter search term!');
    setSearchTerm('');
  };

  return (
    <form onSubmit={searchHandler}>
      <input
        ref={inputRef}
        type="text"
        onChange={onChange}
        value={searchTerm}
      />
    </form>
  );
};

export default SearchFeature;
