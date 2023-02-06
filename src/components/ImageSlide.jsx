import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useQuery } from '@tanstack/react-query';
import { useApiContext } from '../context/ApiContext';
import { paginationForCarousel } from '../config';
import Banner from './ui/Banner';
import { formatAgo } from '../util/date';

export default function ImageSlide() {
  const { workService } = useApiContext();
  const { limit, offset } = paginationForCarousel;
  const { error, data: images } = useQuery(
    ['carousel'],
    async () => await workService.showWorks(limit, offset)
  );

  return (
    <section className="flex justify-center">
      <Carousel
        autoPlay={true}
        stopAutoPlayOnHover={true}
        indicators={true}
        animation="slide"
        navButtonsAlwaysVisible={true}
        className="w-3/6"
      >
        {images &&
          images.map((image) => (
            <div>
              <img
                src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${image.fileName}`}
                alt={image.title}
                className="rounded-md"
              />
              <div className="text-center text-2xl mt-6 text-gray-600">
                <span className="">By {image.username}</span>
                <span className="ml-4">{formatAgo(image.createdAt)}</span>
              </div>
            </div>
          ))}
      </Carousel>
      {error && <Banner text={`😰 An error has occurred: ${error.message}`} />}
    </section>
  );
}
