/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/outline";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const WhyExhibit: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-6 lg:py-10 px-4 bg-white mb-10">
        <h3 className="text-3xl lg:text-4xl font-bold text-gray-700 text-center px-2 mb-6 md:mb-10">
          Why Exhibit
        </h3>
        <div className="lg:mt-4 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-relaxed text-gray-600 px-2">
              In HEF 2021 you get the chance to meet potential clients in a one
              one meeting through our online booking system and business
              matching.
            </p>

            <ol className="mt-6 max-w-5xl mx-auto space-y-6 list-decimal">
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="flex-1 text-gray-700 text-lg">
                  A joint forum between regulators (government), academics
                  (experts/universities), and industries to facilitate the
                  hospital needs that’s up to standards and financial conditions
                  of the hospital.
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="flex-1 text-gray-700 text-lg">
                  Increase exposure towards your products by demonstrating it
                  during selected webinars and in our exhibition hall. (Products
                  presented must meet the national or international standards)
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="flex-1 text-gray-700 text-lg">
                  Connect with potential buyers (up to 40 potential buyers in 3
                  days)
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="flex-1 text-gray-700 text-lg">
                  The opportunity to be recommended by the association as a
                  company with technically appropriate products and services
                  (based on assessment results by IAHE) to all IAHE members.
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="flex-1 text-gray-700 text-lg">
                  The opportunity to partner with IAHE to continuously encourage
                  and build hospitals in Indonesia that are safer, more
                  environmentally friendly, affordable, secure and beneficial.
                </span>
              </li>
            </ol>
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

export default WhyExhibit;
