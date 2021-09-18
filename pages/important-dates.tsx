/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import {
  CheckCircleIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/solid";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const ImportantDates: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-2 bg-white mb-10">
        <h3 className="mt-2 mb-6 text-4xl font-bold text-gray-700 text-center">
          Important Dates
        </h3>
        <div className="rounded-xl max-w-4xl mx-auto w-full h-full p-12">
          <div className="relative wrap overflow-hidden h-full">
            <div
              className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
              style={{ left: "50%" }}
            ></div>

            {/* <!-- left timeline --> */}
            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="order-1 z-20 bg-white">
                <CheckCircleIcon className=" shadow-lg rounded-full w-10 h-10 text-primary-500" />
              </div>

              <div className="order-1 bg-primary-500 rounded-lg shadow-lg w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-white text-xl">
                  1 September 2021
                </h3>
                <p className="text-white text-opacity-100">
                  Registration Started
                </p>
              </div>
            </div>

            {/* <!-- right timeline --> */}
            <div className="mb-8 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="order-1 z-20 bg-white">
                <DotsCircleHorizontalIcon className=" shadow-lg rounded-full w-10 h-10 text-gray-500" />
              </div>
              <div className="order-1 bg-gray-300 rounded-lg shadow-lg w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gray-800 text-xl">
                  2 October 2021
                </h3>
                <p className="text-gray-900 text-opacity-100">Event Day 1</p>
              </div>
            </div>

            {/* <!-- left timeline --> */}
            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="order-1 z-20 bg-white">
                <DotsCircleHorizontalIcon className=" shadow-lg rounded-full w-10 h-10 text-gray-500" />
              </div>
              <div className="order-1 bg-gray-300 rounded-lg shadow-lg w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gray-800 text-xl">
                  16 October 2021
                </h3>
                <p className="text-gray-900 text-opacity-100">Event Day 2</p>
              </div>
            </div>

            {/* <!-- right timeline --> */}
            <div className="mb-2 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="order-1 z-20 bg-white">
                <DotsCircleHorizontalIcon className=" shadow-lg rounded-full w-10 h-10 text-gray-500" />
              </div>
              <div className="order-1 bg-gray-300 rounded-lg shadow-lg w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gray-800 text-xl">
                  30 October 2021
                </h3>
                <p className="text-gray-900 text-opacity-100">Event Day 3</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default ImportantDates;
