import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import Link from "next/link";
import lottie from "lottie-web";

const MainHall: NextPage = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../data/lottie/under-construction.json"),
      });
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold text-center text-gray-600">
          Maintenance
        </h1>
        <h2 className="mt-2 text-4xl font-bold text-center text-primary-600">
          We will be back soon
        </h2>
        <div ref={container}></div>
        <div className="flex justify-center">
          <Link href="/">
            <a className="text-lg font-bold underline text-primary-600 hover:text-primary-700">
              &larr; Back to Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHall;
