/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Pagination, A11y, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "next-i18next";

import { Navbar } from "./Navbar";

import "swiper/css/effect-fade";

const engineeringAreas = (t: any) => [
  {
    name: t("hospital-buildings"),
    imgSrc: {
      webp: "/webp/hospital-buildings.webp",
      jpg: "/hospital-buildings.jpg",
    },
  },
  {
    name: t("hospital-mechanics"),
    imgSrc: {
      webp: "/webp/hospital-mechanics.webp",
      jpg: "/hospital-mechanics.jpg",
    },
  },
  {
    name: t("hospital-electrics"),
    imgSrc: {
      webp: "/webp/hospital-electrics.webp",
      jpg: "/hospital-electrics.jpg",
    },
  },
  {
    name: t("hospital-environments"),
    imgSrc: {
      webp: "/webp/hospital-environments.webp",
      jpg: "/hospital-environments.jpg",
    },
  },
  {
    name: t("hospital-informatics"),
    imgSrc: {
      webp: "/webp/hospital-informatics.webp",
      jpg: "/hospital-informatics.jpg",
    },
  },
  {
    name: t("hospital-devices"),
    imgSrc: {
      webp: "/webp/hospital-devices.webp",
      jpg: "/hospital-devices.jpg",
    },
  },
];

const Hero = () => {
  const { t } = useTranslation("common");
  return (
    <div className="relative h-60 sm:h-96 lg:h-[550px] xl:hero-image-height">
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
            <picture>
              <source srcSet="/webp/main-hall.webp" type="image/webp" />
              <source srcSet="/main-hall.jpg" type="image/jpeg" />
              <img
                className="object-cover w-full h-full mix-blend-overlay swiper-slide"
                src="/main-hall.jpg"
                alt="Hospital Engineering Forum 2021"
              />
            </picture>
            <div className="mx-auto max-w-7xl w-full flex justify-center px-2">
              <div className="absolute top-1/2 -translate-y-1/2">
                <div>
                  <div
                    className="text-2xl md:text-6xl 2xl:text-7xl md:leading-[80px] drop-shadow-xl text-white font-bold text-center"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0, 0.5)" }}
                  >
                    {t("event-title")}
                  </div>
                  <div
                    className="mt-2 md:mt-4 mb-1 text-sm sm:text-md md:text-3xl font-semibold drop-shadow-xl text-white flex items-center justify-center px-2 sm:px-0"
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
        {engineeringAreas(t).map((engineeringArea) => (
          <SwiperSlide key={engineeringArea.name}>
            <div className="swiper-slide relative bg-gradient-to-b from-[#00B4BF] to-transparent">
              <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
              <picture>
                <source
                  srcSet={engineeringArea.imgSrc.webp}
                  type="image/webp"
                />
                <source srcSet={engineeringArea.imgSrc.jpg} type="image/jpeg" />
                <img
                  className="object-cover w-full h-full mix-blend-overlay swiper-slide"
                  src={engineeringArea.imgSrc.jpg}
                  alt={engineeringArea.name}
                />
              </picture>
              {/* <img
                className="object-cover w-full h-full mix-blend-overlay swiper-slide"
                src={engineeringArea.imgSrc}
                alt={engineeringArea.name}
              /> */}
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
      <Navbar />
    </div>
  );
};

export default Hero;
