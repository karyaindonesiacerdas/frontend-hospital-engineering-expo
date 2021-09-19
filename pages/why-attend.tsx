/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useTranslation } from "next-i18next";
import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const WhyAttend: NextPage = () => {
  const { t } = useTranslation("visitor");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <h3 className="text-3xl lg:text-4xl font-bold text-gray-700 text-center px-2 mb-6 md:mb-10">
          {t("why-attend.title")}
        </h3>
        <div className="lg:mt-4 grid lg:grid-cols-2 gap-14">
          <div>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-relaxed text-gray-600 px-2">
              {t("why-attend.overview")}
            </p>

            <ul className="mt-6 max-w-5xl mx-auto space-y-6">
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  {t("why-attend.profit-1")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  {t("why-attend.profit-2")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  {t("why-attend.profit-3")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  {t("why-attend.profit-4")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  {t("why-attend.profit-5")}
                </span>
              </li>
              <li className="flex items-start space-x-3 text-gray-700">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
                <span className="flex-1 text-gray-700 text-lg">
                  {t("why-attend.profit-6")}
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

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "visitor"])),
  },
});
