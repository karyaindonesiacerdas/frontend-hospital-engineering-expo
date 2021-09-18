/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Pagination, A11y, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navbar } from "./Navbar";

import "swiper/css/effect-fade";

const engineeringAreas = [
  {
    name: "Hospital Buildings",
    imgSrc: "/hospital-buildings.jpg",
  },
  {
    name: "Hospital Mechanics",
    imgSrc: "/hospital-mechanics.jpg",
  },
  {
    name: "Hospital Electrics",
    imgSrc: "/hospital-electrics.jpg",
  },
  {
    name: "Hospital Environments",
    imgSrc: "/hospital-environments.jpg",
  },
  {
    name: "Hospital Informatics",
    imgSrc: "/hospital-informatics.jpg",
  },
  {
    name: "Hospital Devices",
    imgSrc: "/hospital-devices.jpg",
  },
];

const Hero = () => {
  return (
    <div className="relative h-60 sm:h-96 lg:h-[550px] xl:hero-image-height">
      <Navbar />
      <Swiper
        // install Swiper modules
        modules={[Pagination, A11y, EffectFade]}
        effect="fade"
        // spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        className="h-full w-full"
      >
        <SwiperSlide>
          <div className="swiper-slide relative bg-gradient-to-b from-[#00B4BF] to-transparent">
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
            <img
              className="object-cover w-full h-full mix-blend-overlay swiper-slide"
              src="/main-hall.jpg"
              alt="Hospital Engineering Forum 2021"
            />
            <div className="mx-auto max-w-7xl w-full flex justify-center px-2">
              <div className="absolute top-1/2 -translate-y-1/2">
                <div>
                  <div
                    className="text-2xl md:text-6xl 2xl:text-7xl md:leading-[80px] drop-shadow-xl text-white font-bold text-center"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0, 0.5)" }}
                  >
                    Hospital Engineering Forum 2021
                  </div>
                  <div
                    className="mt-2 md:mt-4 mb-1 text-md md:text-3xl font-semibold drop-shadow-xl text-white flex items-center justify-center"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0, 0.5)" }}
                  >
                    <span>Webinar Series</span>
                    <span className="text-xl md:text-4xl font-bold px-2 md:px-3">
                      &#183;
                    </span>
                    <span>Virtual Exhibition</span>
                    <span className="text-xl md:text-4xl font-bold px-2 md:px-3">
                      &#183;
                    </span>
                    <span>Business Matching</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide relative bg-gradient-to-b from-[#00B4BF] to-transparent">
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
            <img
              className="object-cover w-full h-full mix-blend-overlay swiper-slide"
              src="/virtual-booth-10.jpg"
              alt="Hospital Engineering Forum 2021"
            />
            <div className="mx-auto max-w-7xl w-full flex justify-center px-2">
              <div className="absolute top-1/2 -translate-y-1/2">
                <div>
                  <div
                    className="text-2xl md:text-6xl 2xl:text-7xl md:leading-[80px] drop-shadow-xl text-white font-bold text-center"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0, 0.5)" }}
                  >
                    Virtual Exhibition
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {engineeringAreas.map((engineeringArea) => (
          <SwiperSlide key={engineeringArea.name}>
            <div className="swiper-slide relative bg-gradient-to-b from-[#00B4BF] to-transparent">
              <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
              <img
                className="object-cover w-full h-full mix-blend-overlay swiper-slide"
                src={engineeringArea.imgSrc}
                alt={engineeringArea.name}
              />
              <div className="mx-auto max-w-7xl w-full flex justify-center md:justify-end px-2">
                <div className="absolute top-1/2 -translate-y-1/2 md:max-w-sm">
                  <div
                    className="uppercase mb-1 text-xl font-bold drop-shadow-xl text-white text-center md:text-left"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0, 0.5)" }}
                  >
                    Six Hospital Engineering Area
                  </div>
                  <div
                    className="text-2xl md:text-6xl 2xl:text-7xl md:leading-[80px] drop-shadow-xl text-white font-bold text-center md:text-left"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0, 0.5)" }}
                  >
                    {engineeringArea.name}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
