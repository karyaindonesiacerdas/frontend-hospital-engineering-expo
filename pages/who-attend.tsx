/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/outline";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const WhoAttend: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="lg:mt-4 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-700 text-center lg:text-left px-2 mb-6">
              Who Attend
            </h3>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 px-2">
              With over 8000 registered members from Indonesia, PTPI is
              recognised nationally for conducting webinars focusing in hospital
              engineering. Healthcare professionals across the following
              industry sectors are represented within our visitor profiles:
            </p>

            <ul className="mt-6 max-w-5xl mx-auto grid grid-cols-2 gap-6">
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="max-w-sm text-gray-700 text-lg">
                  Hospital Management Team
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  Hospital Clinical Staff
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  Hospital Engineering Staff
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  Biomedical Engineer
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  Medical Doctor
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  Government Staff
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  University Lecturer
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl" style={{ perspective: "1000px" }}>
            <div
              className="aspect-w-3 aspect-h-2 shadow-2xl"
              style={{ transform: "rotateY(-15deg) rotateX(5deg)" }}
            >
              <Image
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
                src="/who-attend.png"
                alt="Who attend"
              />
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default WhoAttend;
