import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import {
  Header,
  CTA,
  OrganizedBy,
  Footer,
  SponsoredBy,
} from "@/components/landing-page";

export const LandingPageLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className="bg-white border-gray-200 border">
        <div className="text-white rounded-md overflow-hidden backdrop-filter backdrop-blur-xl">
          <Marquee
            speed={80}
            gradient={true}
            gradientColor={[255, 255, 255]}
            className="h-14 overflow-hidden"
            // style={{ height: "2.6vw" }}
          >
            <a
              href="http://www.chint.id/"
              target="_blank"
              rel="noreferrer"
              className="font-bold uppercase text-xl leading-loose flex items-center space-x-3 mx-28  hover:bg-gray-100"
            >
              <Image
                src="/sponsor/chint-electric.png"
                alt="Chint"
                height={80}
                width={80}
                objectFit="contain"
                className="bg-white"
              />
              <span className="text-[#4077B3]">
                Chint Electric &quot;Empower The World&quot;
              </span>
            </a>
            <div className="mx-28 font-semibold text-primary-600">
              The 3rd day of the event will be held on November 6, 2021!
            </div>
            {/* <img
            className="object-contain h-full mx-28"
            src="/sponsor/running-text-panasonic.jpeg"
            alt="panasonic"
          /> */}
            <a
              href="https://www.panasonic.com/id"
              target="_blank"
              rel="noreferrer"
              className="text-sm leading-tight flex items-center space-x-3 mx-28 text-gray-900 hover:bg-gray-100"
            >
              <Image
                src="/sponsor/panasonic.png"
                alt="Panasonic"
                height={60}
                width={130}
                objectFit="cover"
                className="bg-white"
              />
              <div>
                <div className="font-bold">
                  Terbukti{" "}
                  <span className="text-blue-700">
                    99.99% Efektif melawan Virus Corona*
                  </span>{" "}
                  dengan
                </div>
                <div className="font-bold">
                  AC Panasonic 2 IN 1 (AC+Air Purifier) nanoe&trade; X
                </div>
                <div className="text-xs text-gray-700">
                  *Berdasarkan hasil uji validitas efisiensi nanoe&trade; X oleh
                  Texcell, Perancis
                </div>
              </div>
              <Image
                src="/sponsor/panasonic-shield.png"
                alt="Panasonic"
                height={60}
                width={100}
                objectFit="contain"
                className="bg-white"
              />
            </a>
            <div className="mx-28 font-semibold text-primary-600">
              The 3rd day of the event will be held on November 6, 2021!
            </div>
          </Marquee>
          {/* <Marquee
            speed={80}
            gradient={true}
            gradientColor={[0, 132, 140]}
            className="h-10 overflow-hidden"
            // style={{ height: "2.6vw" }}
          >
            <a
              href="http://www.chint.id/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold uppercase text-xl leading-loose flex items-center space-x-3 mx-28 hover:text-gray-200"
            >
              <Image
                src="/sponsor/chint-electric.png"
                alt="Chint"
                height={80}
                width={80}
                objectFit="contain"
                className="bg-white"
              />
              <span>Chint Electric &quot;Empower The World&quot;</span>
            </a>
            <div className="mx-28 font-semibold">
              The 3rd day of the event will be held on November 6, 2021!
            </div>
          </Marquee> */}
        </div>
      </div>
      <Header />
      {children}
      {/* <CTA /> */}
      <SponsoredBy />
      <OrganizedBy />
      <Footer />
    </>
  );
};
