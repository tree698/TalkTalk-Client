import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { AiOutlinePicture } from 'react-icons/ai';
import { MdDownloading } from 'react-icons/md';
import DisplayDrawing from '../components/DisplayDrawing';
import { useApiContext } from '../context/ApiContext';
import { paginationForMyDrawingsAndSearchedDrawings } from '../config';
import Banner from '../components/ui/Banner';

export default function SearchedDrawings() {
  const [drawings, setDrawings] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { limit, offset } = paginationForMyDrawingsAndSearchedDrawings;
  const { workService } = useApiContext();
  const {
    state: { searchTerm },
  } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    searchTerm &&
      workService
        .searchWorks(limit, offset, searchTerm)
        .then((drawings) => setDrawings((prev) => [...drawings]))
        .catch((error) => setError((prev) => error.toString()))
        .finally(() => setIsLoading(false));
  }, [searchTerm, workService]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center">
      {isLoading && (
        <div className="flex items-center justify-center gap-1 md:gap-2 lg:gap-3 mt-8 md:mt-10 lg:mt-12 text-xs md:text-sm lg:text-base">
          <MdDownloading className="text-lg md:text-base lg:text-xl" />
          <Banner text="Loading..." />
        </div>
      )}
      <ul className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2 lg:gap-3 mb-6 md:mb-8 lg:mb-10 px-3 md:px-0">
        {drawings &&
          drawings.map((drawing) => (
            <DisplayDrawing key={drawing.id} drawing={drawing} />
          ))}
      </ul>
      {!isLoading && drawings.length === 0 && (
        <div lassName="mt-8 md:mt-10 lg:mt-12 text-xs md:text-sm lg:text-base">
          <AiOutlinePicture className="text-lg md:text-base lg:text-xl mx-auto" />
          <Banner text="No matched drawings" />
        </div>
      )}
    </section>
  );
}
