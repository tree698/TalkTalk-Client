import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDownloading } from 'react-icons/md';
import { paginationForAllDrawings } from '../config';
import { useApiContext } from '../context/ApiContext';
import DisplayDrawing from '../components/DisplayDrawing';
import ViewMore from '../components/ViewMore';
import Banner from '../components/ui/Banner';

export default function AllDrawings() {
  const { limit, offset: initialOffset } = paginationForAllDrawings;
  const { workService } = useApiContext();

  const [drawings, setDrawings] = useState([]);
  const [offset, setOffset] = useState(initialOffset);
  const [lengthDrawings, setLengthDrawings] = useState(limit);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    workService
      .getWorks(limit, offset)
      .then((drawings) => {
        setDrawings((prev) => drawings);
        setIsLoading(false);
      })
      .catch((error) => setError((prev) => error.toString()));
    updateOffset(setOffset, limit, offset);
  }, []);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleClick = () => {
    updateOffset(setOffset, limit, offset);
    workService //
      .getWorks(limit, offset)
      .then((drawing) => {
        setLengthDrawings((prev) => drawing.length);
        setDrawings((prev) => [...drawings, ...drawing]);
      })
      .catch((error) => setError((prev) => error.toString()));
  };

  return (
    <section className="flex flex-col items-center flex-1">
      <ul className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {drawings &&
          drawings.map((drawing) => (
            <DisplayDrawing key={drawing.id} drawing={drawing} />
          ))}
      </ul>
      {isLoading && (
        <div className="flex items-center justify-center gap-4 mt-12 text-2xl">
          <MdDownloading className="text-3xl" />
          <Banner text="Loading..." />
        </div>
      )}
      {!isLoading && (
        <ViewMore
          lengthDrawings={lengthDrawings}
          limit={limit}
          onButtonClick={handleClick}
        />
      )}
    </section>
  );
}

function updateOffset(setOffset, limit, offset) {
  const calculatedOffset = limit + offset;
  return setOffset((prev) => calculatedOffset);
}
