import React, { useEffect, useState } from 'react';
import DisplayDrawing from '../components/DisplayDrawing';
import Banner from '../components/ui/Banner';
import Button from '../components/ui/Button';
import { paginationForMyDrawingsAndSearchedDrawings } from '../config';
import { useApiContext } from '../context/ApiContext';

export default function MyDrawings() {
  const { limit, offset } = paginationForMyDrawingsAndSearchedDrawings;
  const { user, workService } = useApiContext();

  const [drawings, setDrawings] = useState([]);
  const [toBeDeletedId, setToBeDeletedId] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    workService
      .getWorks(limit, offset, user.username)
      .then((data) => setDrawings((prev) => data))
      .catch((error) => setError((prev) => error.toString()));
  }, [workService, user.username]);

  const handleClick = () => {
    const deleteId = screendToBeDeletedId(toBeDeletedId);
    if (deleteId.length === 0) {
      window.alert('Please, choose the works you want to delete!');
      return;
    }
    if (window.confirm('Do you really want to delete?')) {
      deleteId.forEach((drawingId) =>
        workService
          .deleteWork(drawingId)
          .then(() => {
            const updatedDrawings = drawings.filter(
              (drawing) => drawing.id !== drawingId
            );
            setDrawings((prev) => updatedDrawings);
          })
          .catch((error) => setError((prev) => error.toString()))
      );
      setToBeDeletedId([]);
      return;
    }
  };

  return (
    <>
      <Banner text={error} />
      {drawings.length === 0 && <Banner text="Not yet uploaded your drawing" />}
      <Button text="Delete checked drawing" onClick={handleClick} />
      <ul>
        {drawings &&
          drawings.map((drawing) => (
            <DisplayDrawing
              key={drawing.id}
              drawing={drawing}
              toBeDeletedId={(drawingId) =>
                setToBeDeletedId((prev) => [...toBeDeletedId, drawingId])
              }
              checkboxForDelete={true}
            />
          ))}
      </ul>
    </>
  );
}

function screendToBeDeletedId(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const count = array.filter((a) => a === array[i]).length;
    if (count % 2 !== 0) {
      result.push(array[i]);
    }
  }
  return [...new Set(result)];
}
