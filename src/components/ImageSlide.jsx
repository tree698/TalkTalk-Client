import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Carousel from 'react-material-ui-carousel';
import toast from 'react-hot-toast';
import { SlUserFollowing } from 'react-icons/sl';
import { MdDownloading } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import { formatAgo } from '../util/date';
import { useApiContext } from '../context/ApiContext';
import { paginationForCarousel } from '../config';
import Banner from './ui/Banner';

export default function ImageSlide() {
  const { workService } = useApiContext();
  const { limit, offset } = paginationForCarousel;
  const { isLoading, error, data: images } = useQuery(
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
        className="w-[340px] md:w-[400px] lg:w-[700px]"
      >
        {images &&
          images.map((image) => (
            <div
              key={image.id}
              className="w-full h-[340px] md:h-[450px] lg:h-[600px] mx-auto"
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
      {isLoading && (
        <div className="flex items-center justify-center gap-4 mt-12 text-2xl">
          <MdDownloading className="text-3xl" />
          <Banner text="Loading..." />
        </div>
      )}
    </section>
  );
}
