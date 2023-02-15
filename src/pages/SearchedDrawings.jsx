import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AiOutlinePicture } from 'react-icons/ai';
import { MdDownloading } from 'react-icons/md';
import DisplayDrawing from '../components/DisplayDrawing';
import { useApiContext } from '../context/ApiContext';
import { paginationForMyDrawingsAndSearchedDrawings } from '../config';
import Banner from '../components/ui/Banner';

export default function SearchedDrawings() {
  const { limit, offset } = paginationForMyDrawingsAndSearchedDrawings;
  const { workService } = useApiContext();
  const {
    state: { searchTerm },
  } = useLocation();
  const { isLoading, error, data: drawings } = useQuery(
    ['searchedDrawings'],
    () => workService.searchWorks(limit, offset, searchTerm)
  );

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <section className="flex-1">
      {isLoading && (
        <div className="flex items-center justify-center gap-4 mt-12 text-2xl">
          <MdDownloading className="text-3xl" />
          <Banner text="Loading..." />
        </div>
      )}
      <ul className="max-w-[340px] md:max-w-[800px] lg:max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 p-2 md:p-3 lg:p-4">
        {drawings &&
          drawings.map((drawing) => (
            <DisplayDrawing key={drawing.id} drawing={drawing} />
          ))}
      </ul>
      {!drawings && (
        <div className="flex items-center justify-center gap-4 mt-12 text-2xl">
          <AiOutlinePicture className="text-4xl" />
          <Banner text="No matched drawings" />
        </div>
      )}
    </section>
  );
}
