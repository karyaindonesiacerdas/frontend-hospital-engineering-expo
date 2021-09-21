/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import styles from "./Board.module.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

const Board = () => {
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
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            {/* Slide  1 X 2 */}
            <SwiperSlide style={{ paddingBottom: "2vw" }}>
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
            </SwiperSlide>
            {/* Slide  2 X 3 */}
            <SwiperSlide style={{ paddingBottom: "1vw" }}>
              <div className="grid grid-cols-3 grid-rows-2 gap-[0.5vw] p-[1vw] w-full h-full">
                <Link href="/virtual-booth-5">
                  <a
                    className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                    style={{ padding: "0.5vw" }}
                  >
                    <img style={{ width: "40%" }} src="/ptpi.png" alt="PTPI" />
                    <span style={{ fontSize: "1vw" }}>PTPI</span>
                  </a>
                </Link>
                <Link href="/virtual-booth-5">
                  <a
                    className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                    style={{ padding: "0.5vw" }}
                  >
                    <img style={{ width: "40%" }} src="/ptpi.png" alt="PTPI" />
                    <span style={{ fontSize: "1vw" }}>PTPI</span>
                  </a>
                </Link>
                <Link href="/virtual-booth-5">
                  <a
                    className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                    style={{ padding: "0.5vw" }}
                  >
                    <img style={{ width: "40%" }} src="/ptpi.png" alt="PTPI" />
                    <span style={{ fontSize: "1vw" }}>PTPI</span>
                  </a>
                </Link>
                <Link href="/virtual-booth-5">
                  <a
                    className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                    style={{ padding: "0.5vw" }}
                  >
                    <img style={{ width: "40%" }} src="/ptpi.png" alt="PTPI" />
                    <span style={{ fontSize: "1vw" }}>PTPI</span>
                  </a>
                </Link>
                <Link href="/virtual-booth-5">
                  <a
                    className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                    style={{ padding: "0.5vw" }}
                  >
                    <img style={{ width: "40%" }} src="/ptpi.png" alt="PTPI" />
                    <span style={{ fontSize: "1vw" }}>PTPI</span>
                  </a>
                </Link>
                <Link href="/virtual-booth-5">
                  <a
                    className="flex flex-col justify-center bg-gray-100 hover:shadow-lg cursor-pointer rounded-xl items-center"
                    style={{ padding: "0.8vw" }}
                  >
                    <img style={{ width: "40%" }} src="/ptpi.png" alt="PTPI" />
                    <span style={{ fontSize: "1vw" }}>PTPI</span>
                  </a>
                </Link>
              </div>
            </SwiperSlide>
            {/* Slide  2 X 4 */}
            <SwiperSlide style={{ paddingBottom: "1vw" }}>
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
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Board;
