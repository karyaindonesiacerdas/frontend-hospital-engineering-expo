import type { NextPage } from "next";
import dynamic from "next/dynamic";

import "swiper/css";
import "swiper/css/pagination";

import { Header } from "@/components/landing-page";

const Hero = dynamic(() => import("@/components/landing-page/Hero"));

const Home: NextPage = () => {
  return (
    <>
      <Header />

      <Hero />
    </>
  );
};

export default Home;
