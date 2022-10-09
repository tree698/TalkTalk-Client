import React from 'react';
import { useEffect, useState } from 'react';
import DisplayWork from '../displayWorks/displayWork';
import SearchFeature from '../searchFeature/searchFeature';

const AllWorks = ({ workService, onClickWork }) => {
  const pagination = {
    limit: 8,
    offset: 0,
  };

  const [works, setWorks] = useState([]);
  const [limit, setLimit] = useState(pagination.limit);
  const [offset, setOffset] = useState(pagination.offset);
  const [lengthWork, setLengthWork] = useState(pagination.limit);

  useEffect(() => {
    workService.getWorks(limit, offset).then(setWorks);
    updateOffset();
  }, [workService]);

  const clickHandler = () => {
    updateOffset();
    workService.getWorks(limit, offset).then((data) => {
      setLengthWork(data.length);
      setWorks([...works, ...data]);
    });
  };

  const updateOffset = () => {
    const updateOffset = limit + offset;
    setOffset(updateOffset);
  };

  const searchTermHandler = (term) => {
    workService.searchWorks(limit, pagination.offset, term).then((work) => {
      setLengthWork(work.length);
      setWorks(work);
    });
  };

  return (
    <div>
      <SearchFeature onSendSearchTerm={searchTermHandler} />
      <div>
        {works.map((work) => (
          <DisplayWork key={work.id} work={work} onClickWork={onClickWork} />
        ))}

        {lengthWork === limit && (
          <button onClick={clickHandler}>View More</button>
        )}
      </div>
    </div>
  );
};
export default AllWorks;
