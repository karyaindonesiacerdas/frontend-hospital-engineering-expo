import type { NextPage } from "next";
import Image from "next/image";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const AboutHEF: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="text-[#00B4BF] uppercase text-xl font-bold text-center lg:text-left">
          About
        </div>
        <h3 className="mt-2 mb-6 text-4xl font-bold text-gray-700 up text-center lg:text-left">
          Hospital Engineering Forum 2021
        </h3>
        <div className="mt-4 grid lg:grid-cols-2 gap-10 items-center">
          <div
            className="overflow-hidden lg:order-last"
            style={{ perspective: "1000px" }}
          >
            <div
              className="aspect-w-3 aspect-h-2"
              style={{ transform: "rotateY(-15deg) rotateX(5deg)" }}
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
          <div>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600">
              Hospital Engineering Forum is the first virtual national seminar
              and international fair by Indonesian Association of Hospital
              Engineering (IAHE) which will be held on 2, 16, and 30 October
              2021. This forum focuses on 6 hospital engineering areas: Hospital
              Building, Hospital Mechanic, Hospital Electric, Hospital
              Environment, Hospital Informatics, and Hospital Devices. More than
              40 speakers from the government, association, hospital and
              industry sectors are invited. We also provide stands for around
              100 local and international exhibitors. This event will be
              co-organized by Karya Indonesia Cerdas.
            </p>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default AboutHEF;
