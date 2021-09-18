/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/outline";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const WhyAttend: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <h3 className="text-3xl lg:text-4xl font-bold text-gray-700 text-center px-2 mb-6 md:mb-10">
          Why Attend
        </h3>
        <div className="lg:mt-4 grid lg:grid-cols-2 gap-14">
          <div>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-relaxed text-gray-600 px-2">
              Visitors of HEF 2021 can look forward to joining a free of charge
              3 days online event, ranging from a series of webinars to
              networking opportunities with our exhibitors.
            </p>

            <ul className="mt-6 max-w-5xl mx-auto space-y-6">
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  A series of seminars with over 40 speakers from the
                  government, association, industry and hospital sectors with a
                  live Q&A session in each seminar to facilitate the hospital
                  needs that’s up to standards and affordable.
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  Product presentation from exhibitors and 1 on 1 business
                  matching between exhibitors and prospective buyers.
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  Free 1 on 1 consultation with speakers or consultants
                  specializing in the 6 hospital engineering areas.
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  Networking with over 7900 members of IAHE
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  Get exclusive materials on the topic of Hospital Engineering
                  in the era of COVID19 and Industry 4.0.
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  Certificate worth 24 points And win attractive prizes and
                  rewards throughout the event.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <div className="aspect-w-3 aspect-h-2">
              <Image
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
                src="/why-attend-and-exhibit-1.png"
                alt="Why attend"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2">
              <Image
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
                src="/why-attend-and-exhibit-2.png"
                alt="Why attend"
              />
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default WhyAttend;
