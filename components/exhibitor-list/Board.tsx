/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import styles from "./Board.module.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

import type { Exhibitor } from "types";

type Props = {
  _exhibitors: Exhibitor[];
};

const Board = ({ _exhibitors }: Props) => {
  const exhibitors = _exhibitors.filter(
    (exhibitor) => exhibitor.package_id !== 2
  );
  const totalExhibitor = exhibitors.length;
  const totalSlide = Math.ceil(totalExhibitor / 6);
  return (
    <div className={styles.boardWrapper}>
      <div className={styles.board}>
        <div className="text-3xl text-black">
          <Swiper
            // install Swiper modules
            modules={[Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            style={{ height: "25vw", paddingBottom: "1.5vw" }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            {Array.from(Array(totalSlide).keys()).map((i) => (
              <SwiperSlide key={i} style={{ paddingBottom: "1vw" }}>
                <div className="grid grid-cols-3 grid-rows-2 gap-[1vw] p-[1vw] w-full h-full">
                  {exhibitors
                    ?.filter?.(
                      (_, index) => index >= i * 6 && index <= (i + 1) * 6 - 1
                    )
                    .map((exhibitor) => {
                      return (
                        <Link
                          key={exhibitor.id}
                          href={`/exhibitors/${exhibitor.id}`}
                        >
                          <a
                            className="grid grid-rows-4 bg-gray-100 hover:shadow-lg cursor-pointer rounded-md h-full relative"
                            style={{ padding: "0.5vw" }}
                          >
                            <div
                              className="row-span-3 overflow-hidden"
                              style={{
                                paddingRight: "2vw",
                                paddingLeft: "2vw",
                                paddingTop: "0.6vw",
                                paddingBottom: "0.2vw",
                              }}
                            >
                              <img
                                className="w-full object-contain h-full"
                                // style={{ height: "100%", width: "auto" }}
                                src={
                                  exhibitor.company_logo
                                    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/companies/${exhibitor.company_logo}`
                                    : "/logo-placeholder.svg"
                                }
                                // src="/logo-placeholder.svg"
                                alt={exhibitor.company_name}
                              />
                            </div>
                            <div
                              className="row-span-1 flex items-center justify-center font-semibold text-gray-600"
                              style={{ fontSize: "0.9vw" }}
                            >
                              {exhibitor.company_name}
                            </div>

                            {[3, 4, 5].includes(exhibitor.package_id) && (
                              <span
                                className="absolute bg-primary-600 text-white inline-flex justify-center items-center rounded-full font-semibold shadow-2xl"
                                style={{
                                  fontSize: "0.9vw",
                                  padding: "0 0.5vw",
                                  height: "1.6vw",
                                  top: "-0.5vw",
                                  right: "0",
                                }}
                              >
                                Open Consultation
                              </span>
                            )}
                          </a>
                        </Link>
                      );
                    })}
                </div>
              </SwiperSlide>
            ))}
            {/* Slide  1 X 2 */}
            {/* <SwiperSlide style={{ paddingBottom: "2vw" }}>
              <div className="grid grid-cols-2 gap-[0.5vw] p-[1vw] w-full h-full">
                <Link href="/virtual-booth-10">
                  <a
                    className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                    style={{ padding: "1vw" }}
                  >
                    <img style={{ width: "65%" }} src="/ptpi.png" alt="PTPI" />
                    <span style={{ fontSize: "2vw", marginTop: "0.5vw" }}>
                      PTPI
                    </span>
                  </a>
                </Link>
                <Link href="/virtual-booth-10">
                  <a
                    className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                    style={{ padding: "1vw" }}
                  >
                    <img style={{ width: "65%" }} src="/ptpi.png" alt="PTPI" />
                    <span style={{ fontSize: "2vw", marginTop: "0.5vw" }}>
                      PTPI
                    </span>
                  </a>
                </Link>
              </div>
            </SwiperSlide> */}
            {/* Slide  2 X 3 */}
            {/* <SwiperSlide style={{ paddingBottom: "1vw" }}>
              <div className="grid grid-cols-3 grid-rows-2 gap-[0.5vw] p-[1vw] w-full h-full">
                {exhibitors?.map((exhibitor) => (
                  <Link key={exhibitor.id} href={`/exhibitors/${exhibitor.id}`}>
                    <a
                      className="grid grid-rows-4 bg-gray-100 hover:shadow-lg cursor-pointer rounded-md h-full"
                      style={{ padding: "0.5vw" }}
                    >
                      <div
                        className="row-span-3 flex items-center justify-center"
                        style={{
                          paddingRight: "2vw",
                          paddingLeft: "2vw",
                          paddingTop: "0.6vw",
                          paddingBottom: "0.2vw",
                        }}
                      >
                        <img
                          style={{ height: "100%", width: "auto" }}
                          src={
                            `${process.env.NEXT_PUBLIC_STORAGE_URL}/companies/${exhibitor.company_logo}` ||
                            "/logo-placeholder.svg"
                          }
                          alt={exhibitor.company_name}
                        />
                      </div>
                      <span
                        className="row-span-1 flex items-center justify-center font-semibold text-gray-600"
                        style={{ fontSize: "0.8vw" }}
                      >
                        {exhibitor.company_name}
                      </span>
                    </a>
                  </Link>
                ))}
              </div>
            </SwiperSlide> */}
            {/* Slide  2 X 4 */}
            {/* <SwiperSlide style={{ paddingBottom: "1vw" }}>
              <div className="grid grid-cols-4 grid-rows-2 gap-[0.5vw] p-[1vw] w-full h-full">
                <a
                  href="#"
                  className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                  style={{ padding: "0.5vw" }}
                >
                  <img style={{ width: "50%" }} src="/ptpi.png" alt="PTPI" />
                  <span style={{ fontSize: "1vw" }}>PTPI</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                  style={{ padding: "0.5vw" }}
                >
                  <img style={{ width: "50%" }} src="/ptpi.png" alt="PTPI" />
                  <span style={{ fontSize: "1vw" }}>PTPI</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                  style={{ padding: "0.5vw" }}
                >
                  <img style={{ width: "50%" }} src="/ptpi.png" alt="PTPI" />
                  <span style={{ fontSize: "1vw" }}>PTPI</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                  style={{ padding: "0.5vw" }}
                >
                  <img style={{ width: "50%" }} src="/ptpi.png" alt="PTPI" />
                  <span style={{ fontSize: "1vw" }}>PTPI</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                  style={{ padding: "0.5vw" }}
                >
                  <img style={{ width: "50%" }} src="/ptpi.png" alt="PTPI" />
                  <span style={{ fontSize: "1vw" }}>PTPI</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                  style={{ padding: "0.8vw" }}
                >
                  <img style={{ width: "50%" }} src="/ptpi.png" alt="PTPI" />
                  <span style={{ fontSize: "1vw" }}>PTPI</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                  style={{ padding: "0.8vw" }}
                >
                  <img style={{ width: "50%" }} src="/ptpi.png" alt="PTPI" />
                  <span style={{ fontSize: "1vw" }}>PTPI</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                  style={{ padding: "0.8vw" }}
                >
                  <img style={{ width: "50%" }} src="/ptpi.png" alt="PTPI" />
                  <span style={{ fontSize: "1vw" }}>PTPI</span>
                </a>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Board;
