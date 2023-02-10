import React, { useEffect, useState } from 'react';
import { paginationForAllDrawings } from '../config';
import { useApiContext } from '../context/ApiContext';
import DisplayDrawing from '../components/DisplayDrawing';
import ViewMore from '../components/ViewMore';
import toast from 'react-hot-toast';

export default function AllDrawings() {
  const { limit, offset: initialOffset } = paginationForAllDrawings;
  const { workService } = useApiContext();

  const [drawings, setDrawings] = useState([]);
  const [offset, setOffset] = useState(initialOffset);
  const [lengthDrawings, setLengthDrawings] = useState(limit);
  const [error, setError] = useState('');

  useEffect(() => {
    workService
      .getWorks(limit, offset)
      .then((drawings) => setDrawings((prev) => drawings))
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
      <ul className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {drawings &&
          drawings.map((drawing) => (
            <DisplayDrawing key={drawing.id} drawing={drawing} />
          ))}
      </ul>
      <ViewMore
        lengthDrawings={lengthDrawings}
        limit={limit}
        onButtonClick={handleClick}
      />
    </section>
  );
}

function updateOffset(setOffset, limit, offset) {
  const calculatedOffset = limit + offset;
  return setOffset((prev) => calculatedOffset);
}
