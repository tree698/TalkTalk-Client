import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlinePicture } from 'react-icons/ai';
import { MdDownloading } from 'react-icons/md';
import { BsChevronRight } from 'react-icons/bs';
import { paginationForMyDrawingsAndSearchedDrawings } from '../config';
import { useApiContext } from '../context/ApiContext';
import DisplayDrawing from '../components/DisplayDrawing';
import Banner from '../components/ui/Banner';

export default function MyDrawings() {
  const [drawings, setDrawings] = useState([]);
  const [toBeDeletedId, setToBeDeletedId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { user, workService } = useApiContext();
  const { limit, offset } = paginationForMyDrawingsAndSearchedDrawings;

  useEffect(() => {
    setIsLoading(true);
    workService
      .getWorks(limit, offset, user.username)
      .then((data) => {
        setDrawings((prev) => data);
        setIsLoading(false);
      })
      .catch((error) => setError((prev) => error.toString()));
  }, [workService, user.username]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleClick = () => {
    const deleteIds = screendToBeDeletedId(toBeDeletedId);
    if (deleteIds.length === 0) {
      window.alert('Please, choose the works you want to delete!');
      return;
    }
    if (window.confirm('Do you really want to delete?')) {
      deleteIds.forEach((deleteId) =>
        workService
          .deleteWork(deleteId)
          .then(() => {
            const updatedDrawings = drawings.filter(
              (drawing) => !deleteIds.includes(drawing.id)
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
    <section className="flex flex-col items-center flex-1">
      {!isLoading && drawings.length !== 0 && (
        <button
          onClick={handleClick}
          className="w-52 md:w-56 lg:w-60 py-1 md:py-2 lg:py-3 mb-6 md:mb-8 lg:mb-10  text-xs md:text-sm lg:text-base font-semibold text-center text-white bg-brand rounded-3xl hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out"
        >
          Delete checked drawing
        </button>
      )}
      {isLoading && (
        <div className="flex items-center justify-center gap-1 md:gap-2 lg:gap-3 mt-8 md:mt-10 lg:mt-12 text-xs md:text-sm lg:text-base">
          <MdDownloading className="text-lg md:text-base lg:text-xl" />
          <Banner text="Loading..." />
        </div>
      )}
      {!isLoading && drawings.length === 0 && (
        <div className="mt-8 md:mt-10 lg:mt-12 text-xs md:text-sm lg:text-base">
          <AiOutlinePicture className="text-lg md:text-base lg:text-xl mx-auto" />
          <Banner text="Not yet uploaded your drawing" />
        </div>
      )}
      <ul className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-1 md:gap-x-2 lg:gap-x-3 gap-y-4 md:gap-y-6 lg:gap-y-8 mb-6 md:mb-8 lg:mb-10 px-3 md:px-0">
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
    </section>
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
