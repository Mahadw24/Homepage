import React, { useState, useRef } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import Card from '@/components/card';
import data from '/lib/zp_api_listing_data.json';

SwiperCore.use([Navigation]);

const Home = () => {
  const [cardItem, setCardItems] = useState(data.listing);
  const sliderRef = useRef(null);

  const handleLeftArrowClick = () => {
    sliderRef.current.swiper.slidePrev();
  };

  const handleRightArrowClick = () => {
    sliderRef.current.swiper.slideNext();
  };

  const settings = {
    slidesPerView: 1,
    breakpoints: {
      767: {
        slidesPerView: 1,
      },
      868: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView:3,
        spaceBetween:4,
      },
      1800: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
    },
  };

  return (
    <>
      <div className="m-4">
        <div className="flex mb-2 justify-between items-center flex-wrap sm:justify-center0 sm:flex sm:items-center sm:justify-around sm:flex-col">
          <h1 className="text-[25px] lg:text-[30px] font-light tracking-wide sm:font-light mb-1 leading-[30px] sm:text-[25px] m-0 p-0">
            FEATURED
          </h1>
          <h1 className="text-[17px] font-light lg:text-[30px] tracking-widest leading-[30px] mb-2 sm:text-[17px] sm:font-light">
            VIEW ALL HOMES
          </h1>
          <div className="flex w-16 justify-between">
            <img className="cursor-pointer w-3" src="/static/LeftIcon.png" alt="" onClick={handleLeftArrowClick} />
            <img className="cursor-pointer w-3" src="/static/RightIcon.png" alt="" onClick={handleRightArrowClick} />
          </div>
        </div>
        <div>
          <Swiper {...settings} ref={sliderRef}>
            {cardItem.map((item) => {
              return (
                <SwiperSlide key={item.id} >
                  <div className="mx-[2px]">
                    <Card Info={item}/>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Home;