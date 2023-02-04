import React, { useEffect, useState } from 'react';
import { paginationForAllDrawings } from '../config';
import { useApiContext } from '../context/ApiContext';
import DisplayDrawing from '../components/DisplayDrawing';
import Button from '../components/ui/Button';
import Banner from '../components/ui/Banner';

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
  }, [workService]);

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
    <>
      <Banner text={error} />
      <ul>
        {drawings &&
          drawings.map((drawing) => (
            <DisplayDrawing key={drawing.id} drawing={drawing} />
          ))}
      </ul>
      {lengthDrawings === limit && (
        <Button text="View More" onClick={handleClick} />
      )}
    </>
  );
}

function updateOffset(setOffset, limit, offset) {
  const calculatedOffset = limit + offset;
  return setOffset((prev) => calculatedOffset);
}
