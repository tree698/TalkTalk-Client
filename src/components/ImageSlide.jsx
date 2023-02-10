import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useQuery } from '@tanstack/react-query';
import { useApiContext } from '../context/ApiContext';
import { paginationForCarousel } from '../config';
import Banner from './ui/Banner';
import { formatAgo } from '../util/date';
import { SlUserFollowing } from 'react-icons/sl';
import { BiTime } from 'react-icons/bi';
import toast from 'react-hot-toast';

export default function ImageSlide() {
  const { workService } = useApiContext();
  const { limit, offset } = paginationForCarousel;
  const { error, data: images } = useQuery(
    ['carousel'],
    async () => await workService.showWorks(limit, offset)
  );

  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);

  return (
    <section className="flex justify-center">
      <Carousel
        autoPlay={true}
        stopAutoPlayOnHover={true}
        indicators={false}
        animation="fade"
        navButtonsAlwaysVisible={false}
        className="w-[437px] md:w-[525px] lg:w-[700px]"
      >
        {images &&
          images.map((image) => (
            <div
              key={image.id}
              className="w-full h-[340px] sm:h-[375px] md:h-[450px] lg:h-[600px]"
            >
              <img
                src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${image.fileName}`}
                alt={image.title}
                style={{ width: '100%', height: 'auto', borderRadius: '3%' }}
                className="border border-gray-100"
              />
              <div className="flex justify-center text-center text-base md:text-lg lg:text-xl mt-5 text-gray-600">
                <div className="flex justify-center items-center mr-8">
                  <SlUserFollowing />
                  <span className="ml-2">{image.username}</span>
                </div>
                <div className="flex justify-center items-center">
                  <BiTime />
                  <span className="ml-2">{formatAgo(image.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </section>
  );
}
