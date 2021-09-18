/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Image from "next/image";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const Packages: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-2 bg-white mb-10">
        <div className="text-[#00B4BF] uppercase text-xl font-bold text-center">
          Packages
        </div>
        <h3 className="mt-2 mb-6 text-4xl font-bold text-gray-700 text-center">
          Virtual Exhibition Package List
        </h3>
        <div className="max-w-5xl mx-auto">
          <p className="md:text-lg leading-relaxed lg:leading-relaxed text-gray-600 text-center">
            Companies interested in exhibiting may select between the following
            packages or select the desired features separately
          </p>
          <div className="my-4 aspect-w-2 aspect-h-3">
            <Image
              layout="fill"
              objectFit="contain"
              src="/packages.png"
              alt="Packages"
            />
          </div>
          <p className="max-w-5xl text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 text-center">
            For more information about the price, you can contact us in +62 858
            9377 7283 (Adrian).
          </p>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default Packages;
