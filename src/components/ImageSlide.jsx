import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/ApiContext';
import { paginationForCarousel } from '../config';
import Banner from '../components/Banner';

export default function ImageSlide() {
  const { workService } = useAuthContext();
  const { limit, offset } = paginationForCarousel;
  const { isLoading, error, data: images } = useQuery(
    ['carousel'],
    async () => await workService.showWorks(limit, offset)
  );

  return (
    <>
      <h2>Recently, uploaded paintings</h2>
      {/* <Carousel>
        {images.map((work) => (
          <div key={work.id}>
              <img src={`${baseURL}/uploaded_images/${work.fileName}`} />
            <h3>By {work.username}</h3>
          </div>
        ))}
      </Carousel> */}
      {error && <Banner text={`😰 An error has occurred: ${error.message}`} />}
    </>
  );
}
