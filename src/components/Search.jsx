import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { RxDividerVertical } from 'react-icons/rx';

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
      <div className="flex justify-between text-xs md:text-sm lg:text-base py-1 md:py-2 border border-superLightGray rounded-md shadow-inner">
        <input
          type="text"
          onChange={handleChange}
          value={searchTerm}
          placeholder="Search..."
          className="outline-none placeholder:text-black pl-2 md:pl-3 lg:pl-4"
        />
        <div className="flex items-center pr-1 md:pr-2 lg:pr-3">
          <span
            onClick={() => setSearchTerm((prev) => '')}
            className="text-xs md:text-sm lg:text-lg hover:scale-125 transition-all delay-150 duration-300 ease-in-out"
          >
            <RxCross2 />
          </span>
          <RxDividerVertical className="text-xs md:text-sm lg:text-lg text-lightGray" />
          <button className="hover:scale-125 transition-all delay-150 duration-300 ease-in-out">
            <BsSearch />
          </button>
        </div>
      </div>
    </form>
  );
}
