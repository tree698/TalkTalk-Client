import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DisplayDrawing from '../components/DisplayDrawing';
import { paginationForMyDrawingsAndSearchedDrawings } from '../config';
import { useApiContext } from '../context/ApiContext';
import Banner from '../components/ui/Banner';
import toast from 'react-hot-toast';
import { AiOutlinePicture } from 'react-icons/ai';

export default function SearchedDrawings() {
  const { limit, offset } = paginationForMyDrawingsAndSearchedDrawings;
  const { workService } = useApiContext();
  const {
    state: { searchTerm },
  } = useLocation();

  const [drawings, setDrawings] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    searchTerm &&
      workService
        .searchWorks(limit, offset, searchTerm)
        .then((drawings) => setDrawings((prev) => [...drawings]))
        .catch((error) => setError((prev) => error.toString()));
  }, [searchTerm, workService]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <section className="flex-1">
      <ul className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {drawings.length !== 0 &&
          drawings.map((drawing) => (
            <DisplayDrawing key={drawing.id} drawing={drawing} />
          ))}
      </ul>
      {drawings.length === 0 && (
        <div className="flex items-center justify-center gap-4 mt-12 text-2xl">
          <AiOutlinePicture className="text-4xl" />
          <Banner text="No matched drawings" />
        </div>
      )}
    </section>
  );
}
