import React from 'react';
import Carousel from 'react-material-ui-carousel';
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
      <Carousel>
        {images &&
          images.map((image) => (
            <div key={image.id}>
              <img
                style={{ width: '200px' }}
                src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${image.fileName}`}
              />
              <h3>By {image.username}</h3>
            </div>
          ))}
      </Carousel>
      {error && <Banner text={`😰 An error has occurred: ${error.message}`} />}
    </>
  );
}
