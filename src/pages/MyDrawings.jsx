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
    <section className="flex-1">
      {!isLoading && drawings.length !== 0 && (
        <button
          onClick={handleClick}
          className="flex items-center justify-center mx-auto w-[300px] md:w-[400px] text-xl text-center py-3 mt-5 mb-10 bg-accent border text-white border-superLightGray rounded-2xl shadow-xl hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out"
        >
          <BsChevronRight className=" mr-5" />
          <p>Delete checked drawing</p>
        </button>
      )}
      {isLoading && (
        <div className="flex items-center justify-center gap-4 mt-12 text-2xl">
          <MdDownloading className="text-3xl" />
          <Banner text="Loading..." />
        </div>
      )}
      {!isLoading && drawings.length === 0 && (
        <div className="flex items-center justify-center gap-4 mt-12 text-2xl">
          <AiOutlinePicture className="text-4xl" />
          <Banner text="Not yet uploaded your drawing" />
        </div>
      )}
      <ul className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
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
