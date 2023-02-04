import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

export default function ActionBtn() {
  return (
    <div>
      <Link to="/home/alldrawings">
        <p>All Drawings</p>
      </Link>
      <Link to="/home/mydrawings">
        <p>My Drawings</p>
      </Link>
      <Search />
    </div>
  );
}
