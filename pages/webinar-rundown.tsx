/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Image from "next/image";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const WebinarRundown: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <h3 className="mt-2 mb-6 md:mb-10 text-4xl font-bold text-gray-700 text-center">
          Webinar Rundown
        </h3>
        <div className="space-y-10 max-w-5xl mx-auto">
          <div className="aspect-w-2 aspect-h-3">
            <Image
              layout="fill"
              objectFit="contain"
              src="/day-1.png"
              alt="Rundown Day 1"
            />
          </div>
          <div className="aspect-w-2 aspect-h-3">
            <Image
              layout="fill"
              objectFit="contain"
              src="/day-2.png"
              alt="Rundown Day 2"
            />
          </div>
          <div className="aspect-w-2 aspect-h-3">
            <Image
              layout="fill"
              objectFit="contain"
              src="/day-3.png"
              alt="Rundown Day 3"
            />
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default WebinarRundown;
