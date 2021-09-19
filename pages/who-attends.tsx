/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const WhoAttends: NextPage = () => {
  const { t } = useTranslation("visitor");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <h3 className="text-3xl lg:text-4xl font-bold text-gray-700 text-center px-2 mb-6 md:mb-10">
          {t("who-attend.title")}
        </h3>
        <div className="lg:mt-4 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 px-2">
              {t("who-attend.overview")}
            </p>

            <ul className="mt-6 max-w-5xl mx-auto grid grid-cols-2 gap-6">
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="max-w-sm text-gray-700 text-lg">
                  {t("who-attend.attendee-1")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  {t("who-attend.attendee-2")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  {t("who-attend.attendee-3")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  {t("who-attend.attendee-4")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  {t("who-attend.attendee-5")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  {t("who-attend.attendee-6")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />

                <span className="max-w-sm text-gray-700 text-lg">
                  {t("who-attend.attendee-7")}
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

export default WhoAttends;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "visitor"])),
  },
});
