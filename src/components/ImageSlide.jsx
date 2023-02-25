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
        className="w-[320px] md:w-[420px] lg:w-[520px] h-[240px] md:h-[315px] lg:h-[390px]"
      >
        {images &&
          images.map((image) => (
            <div
              key={image.id}
              className="w-[320px] md:w-[420px] lg:w-[520px] h-[240px] md:h-[315px] lg:h-[390px]"
            >
              <img
                src={image.fileName}
                alt={image.title}
                style={{ width: '100%', height: '100%', borderRadius: '3%' }}
                className="border border-superLightGray shadow-md"
              />
              <div className="flex justify-center text-center text-xs md:text-sm lg:text-lg text-gray-600 mt-1 md:mt-2 lg:mt-3">
                <div className="flex justify-center items-center mr-2 md:mr-4 lg:mr-6">
                  <SlUserFollowing />
                  <span className="ml-1 md:ml-2">{image.username}</span>
                </div>
                <div className="flex justify-center items-center">
                  <BiTime />
                  <span className="ml-1 md:ml-2">
                    {formatAgo(image.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
      {isLoading && (
        <div className="flex items-center justify-center gap-4 mt-4 md:mt-6 lg:mt-8 text-xs md:text-sm lg:text-lg">
          <MdDownloading className="text-lg md:text-base lg:text-xl" />
          <Banner text="Loading..." />
        </div>
      )}
    </section>
  );
}
