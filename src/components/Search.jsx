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
      <div className="w-[260px] md:w-[330px] flex text-base md:text-lg lg:text-xl py-1 md:py-2 lg:py-3 border border-superLightGray rounded-md shadow-inner">
        <input
          type="text"
          onChange={handleChange}
          value={searchTerm}
          placeholder="Search..."
          className="w-full outline-none placeholder:text-black pl-4"
        />
        <div className="flex items-center">
          <span
            onClick={() => setSearchTerm((prev) => '')}
            className="text-lg md:text-xl lg:text-2xl hover:scale-125 transition-all delay-150 duration-300 ease-in-out"
          >
            <RxCross2 />
          </span>
          <RxDividerVertical className="text-lg md:text-xl lg:text-2xl text-lightGray" />
          <button className="mr-4 hover:scale-110 transition-all delay-150 duration-300 ease-in-out">
            <BsSearch />
          </button>
        </div>
      </div>
    </form>
  );
}
