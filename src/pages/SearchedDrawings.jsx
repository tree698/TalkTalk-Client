import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DisplayDrawing from '../components/DisplayDrawing';
import Banner from '../components/ui/Banner';
import { paginationForMyDrawingsAndSearchedDrawings } from '../config';
import { useApiContext } from '../context/ApiContext';

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

  return (
    <ul>
      <Banner text={error} />
      {drawings &&
        drawings.map((drawing) => (
          <DisplayDrawing key={drawing.id} drawing={drawing} />
        ))}
    </ul>
  );
}
