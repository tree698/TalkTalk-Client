import React from 'react';
import { useEffect, useState } from 'react';
import DisplayWork from '../displayWorks/displayWork';
import SearchFeature from '../searchFeature/searchFeature';

const AllWorks = ({ workService, onClickWork, onSendSearchTerm }) => {
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
    workService.getWorks(limit, offset).then((work) => {
      setLengthWork(work.length);
      setWorks([...works, ...work]);
    });
  };

  const updateOffset = () => {
    const updateOffset = limit + offset;
    setOffset(updateOffset);
  };

  return (
    <div>
      <SearchFeature onSendSearchTerm={onSendSearchTerm} />
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
