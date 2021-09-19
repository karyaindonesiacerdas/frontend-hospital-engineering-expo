/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

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
  const { t } = useTranslation("exhibitor");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <h3 className="text-3xl lg:text-4xl font-bold text-gray-700 text-center px-2 mb-6 md:mb-10">
          {t("who-exhibit.title")}
        </h3>
        <div className="lg:mt-4 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 px-2">
              {t("who-exhibit.overview")}
            </p>

            <ul className="mt-6 max-w-5xl mx-auto grid grid-cols-2 gap-6">
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">
                    {t("who-exhibit.area-1.name")}
                  </span>
                  <span>{t("who-exhibit.area-1.sub-area")}</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">
                    {t("who-exhibit.area-2.name")}
                  </span>
                  <span>{t("who-exhibit.area-2.sub-area")}</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">
                    {t("who-exhibit.area-3.name")}
                  </span>
                  <span>{t("who-exhibit.area-3.sub-area")}</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">
                    {t("who-exhibit.area-4.name")}
                  </span>
                  <span>{t("who-exhibit.area-4.sub-area")}</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">
                    {t("who-exhibit.area-5.name")}
                  </span>
                  <span>{t("who-exhibit.area-5.sub-area")}</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">
                    {t("who-exhibit.area-6.name")}
                  </span>
                  <span>{t("who-exhibit.area-6.sub-area")}</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <div className="flex-1 text-gray-700 text-lg flex flex-col space-y-1">
                  <span className="font-semibold">
                    {t("who-exhibit.area-7.name")}
                  </span>
                  <span>{t("who-exhibit.area-7.sub-area")}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4 py-4">
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

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "exhibitor"])),
  },
});
