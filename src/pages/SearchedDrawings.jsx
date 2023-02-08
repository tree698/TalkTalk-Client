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
    <section className="flex-1">
      <Banner text={error} />
      <ul className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {drawings.length ? (
          drawings.map((drawing) => (
            <DisplayDrawing key={drawing.id} drawing={drawing} />
          ))
        ) : (
          <Banner text="No matched drawings" />
        )}
      </ul>
    </section>
  );
}
