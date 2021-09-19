/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import {
  CheckCircleIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/solid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const ImportantDates: NextPage = () => {
  const { t } = useTranslation("overview");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <h3 className="mt-2 mb-6 md:mb-10 text-4xl font-bold text-gray-700 text-center">
          {t("important-dates.header")}
        </h3>
        <div className="rounded-xl max-w-4xl mx-auto w-full h-full py-2 md:p-6">
          <div className="relative wrap overflow-hidden h-full">
            <div
              className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
              style={{ left: "50%" }}
            ></div>

            {/* <!-- left timeline --> */}
            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="order-1 z-20 bg-white">
                <CheckCircleIcon className=" shadow-lg rounded-full w-9 h-9 md:w-10 md:h-10 text-primary-500" />
              </div>

              <div className="order-1 bg-primary-500 rounded-lg shadow-lg w-5/12 px-4 py-3 md:px-6 md:py-4">
                <h3 className="mb-3 font-bold text-white md:text-xl">
                  {t("important-dates.date-1.date")}
                </h3>
                <p className="text-sm md:text-base text-white text-opacity-100">
                  {t("important-dates.date-1.event")}
                </p>
              </div>
            </div>

            {/* <!-- right timeline --> */}
            <div className="mb-8 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="order-1 z-20 bg-white">
                <DotsCircleHorizontalIcon className=" shadow-lg rounded-full w-9 h-9 md:w-10 md:h-10 text-gray-500" />
              </div>
              <div className="order-1 bg-gray-300 rounded-lg shadow-lg w-5/12 px-4 py-3 md:px-6 md:py-4">
                <h3 className="mb-3 font-bold text-gray-800 md:text-xl">
                  {t("important-dates.date-2.date")}
                </h3>
                <p className="text-sm md:text-base t-gray-900 text-opacity-100">
                  {t("important-dates.date-2.event")}
                </p>
              </div>
            </div>

            {/* <!-- left timeline --> */}
            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="order-1 z-20 bg-white">
                <DotsCircleHorizontalIcon className=" shadow-lg rounded-full w-9 h-9 md:w-10 md:h-10 text-gray-500" />
              </div>
              <div className="order-1 bg-gray-300 rounded-lg shadow-lg w-5/12 px-4 py-3 md:px-6 md:py-4">
                <h3 className="mb-3 font-bold text-gray-800 md:text-xl">
                  {t("important-dates.date-3.date")}
                </h3>
                <p className="text-sm md:text-base t-gray-900 text-opacity-100">
                  {t("important-dates.date-3.event")}
                </p>
              </div>
            </div>

            {/* <!-- right timeline --> */}
            <div className="mb-2 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="order-1 z-20 bg-white">
                <DotsCircleHorizontalIcon className=" shadow-lg rounded-full w-9 h-9 md:w-10 md:h-10 text-gray-500" />
              </div>
              <div className="order-1 bg-gray-300 rounded-lg shadow-lg w-5/12 px-4 py-3 md:px-6 md:py-4">
                <h3 className="mb-3 font-bold text-gray-800 md:text-xl">
                  {t("important-dates.date-4.date")}
                </h3>
                <p className="text-sm md:text-base t-gray-900 text-opacity-100">
                  {t("important-dates.date-4.event")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default ImportantDates;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "overview"])),
  },
});
