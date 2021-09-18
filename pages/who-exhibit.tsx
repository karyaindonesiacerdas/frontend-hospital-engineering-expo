/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { CheckCircleIcon } from "@heroicons/react/outline";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const engineeringAreas = [
  {
    name: "Hospital Buildings",
    imgSrc: "/hospital-buildings-sm.jpg",
  },
  {
    name: "Hospital Mechanics",
    imgSrc: "/hospital-mechanics-sm.jpg",
  },
  {
    name: "Hospital Electrics",
    imgSrc: "/hospital-electrics-sm.jpg",
  },
  {
    name: "Hospital Environments",
    imgSrc: "/hospital-environments-sm.jpg",
  },
  {
    name: "Hospital Informatics",
    imgSrc: "/hospital-informatics-sm.jpg",
  },
  {
    name: "Hospital Devices",
    imgSrc: "/hospital-devices-sm.jpg",
  },
];

const WhoExhibit: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="lg:mt-4 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-700 text-center lg:text-left px-2 mb-6">
              Who Exhibit
            </h3>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 px-2">
              There will be Medical Devices Manufacturer & Distributor, Hospital
              Equipment and Material Manufacturer & Distributor, Hospital
              Consultant, and Hospital Facility Contractor divided in 6 Industry
              Areas:
            </p>

            <ul className="mt-6 max-w-5xl mx-auto grid grid-cols-2 gap-6">
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">Hospital Buildings</span>
                  <span>Architecture and Structure</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">Hospital Electrics</span>
                  <span>Power and Signaling</span>
                </div>
              </li>

              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">Hospital Environments </span>
                  <span>Waste and Sanitation</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">Hospital Informatics </span>
                  <span>IOT, AI, Big Data, Smart Hospital</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">Hospital Mechanics</span>
                  <span>
                    Plumbing, lift, AC, medical gas, steam, installation and
                    fire prevention, ambulance
                  </span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">Hospital Devices</span>
                  <span>Diagnostics, Surgery, Rehabilitation</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">COVID-19 Products</span>
                  <span>
                    PCR equipment, respiratory equipment, antigen test kit,
                    medical oxygen supplies and equipment, isolation room,
                    Personal Protective Equipment (PPE)
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {engineeringAreas.map((item) => (
              <div
                key={item.name}
                style={{ backgroundImage: `url(${item.imgSrc})` }}
                className="flex items-center justify-center h-40 relative rounded-lg overflow-hidden bg-center bg-cover"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#00B4BF] to-transparent bg-opacity-40"></div>
                <div
                  className="text-lg md:text-2xl font-bold text-white z-10"
                  style={{ textShadow: "1px 1px rgba(0,0,0,0.3)" }}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default WhoExhibit;
