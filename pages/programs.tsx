/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Image from "next/image";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const Programs: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-2 bg-white mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-700 text-center lg:text-left px-2 mb-6">
          Programs
        </h2>
        {/* <!-- Programs 1 --> */}
        <div className="lg:mt-4 grid lg:grid-cols-2 px-2 gap-14 items-center mb-10 lg:mb-20">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-700 text-center lg:text-left px-2 mb-2">
              Webinar Series
            </h3>
            <h4 className="px-2 mb-4 text-gray-500 italic text-xl">
              {"Meet and Consult with Exhibitors"}
            </h4>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 px-2">
              A series of seminars with more than 40 speakers from government,
              hospitals, experts and industry in 6 areas of hospital engineering
              with live question and answer sessions at each seminar
            </p>
          </div>
          <div style={{ perspective: "1000px" }}>
            <div
              className="aspect-w-3 aspect-h-2"
              style={{ transform: "rotateY(-15deg) rotateX(5deg)" }}
            >
              <Image
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
                src="/seminar-room-frame.png"
                alt="About HEF"
              />
            </div>
          </div>
        </div>

        {/* <!-- Programs 2 --> */}
        <div className="lg:mt-4 grid lg:grid-cols-2 px-2 gap-14 items-center mb-10 lg:mb-20">
          <div className="order-first md:order-last">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-700 text-center lg:text-left px-2 mb-4">
              Virtual Exhibition
            </h3>
            <h4 className="px-2 mb-4 text-gray-500 italic text-xl">
              {
                "National & International Hospital Engineering Products Exhibition"
              }
            </h4>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 px-2">
              Exhibition of products from around 100 local and international 
              companies in 6 areas of hospital engineering and products related
              to COVID-19. Opportunity to meet potential buyers in 1 on 1
              business matching and product exposure to 7900 IAHE members.
            </p>
          </div>
          <div style={{ perspective: "1000px" }}>
            <div
              className="aspect-w-3 aspect-h-2"
              style={{ transform: "rotateY(15deg) rotateX(5deg)" }}
            >
              <Image
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
                src="/main-hall-frame.png"
                alt="About HEF"
              />
            </div>
          </div>
        </div>

        {/* <!-- Programs 3 --> */}
        <div className="lg:mt-4 grid lg:grid-cols-2 px-2 gap-14 items-center mb-10 lg:mb-20">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-700 text-center lg:text-left px-2 mb-4">
              Business Matching
            </h3>
            <h4 className="px-2 mb-4 text-gray-500 italic text-xl">
              {"Sharing Best Practices"}
            </h4>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 px-2">
              Opportunity to meet exhibitors in the Link & Match system to
              discuss collaborations and solutions related to 6 areas of
              hospital engineering
            </p>
          </div>
          <div style={{ perspective: "1000px" }}>
            <div
              className="aspect-w-3 aspect-h-2"
              style={{ transform: "rotateY(-15deg) rotateX(5deg)" }}
            >
              <Image
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
                src="/business-matching-frame.png"
                alt="About HEF"
              />
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default Programs;
