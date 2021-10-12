/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const News: NextPage = () => {
  const { t } = useTranslation("overview");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      {/* <BlogAndNews /> */}
      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <h3 className="text-4xl font-bold text-gray-700 text-center px-2 mb-6 md:mb-10">
          {t("news.header")}
        </h3>
        <div className="flex lg:grid gap-10 grid-cols-3 md:grid-cols-2 xl:grid-cols-3 overflow-x-auto md:px-2">
          <Link href="/news/opening">
            <a className="group min-w-[250px] mx-4 md:mx-0">
              <div className="w-full aspect-w-9 aspect-h-6 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/news/news1/1.png"
                  alt="News 1"
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 text-[#00B4BF] font-medium">
                October 8, 2021
              </div>
              <h3 className="mt-2 text-gray-700 font-medium">
                Pembukaan Forum Teknik Perumahsakitan 2021
              </h3>
              <button className="mt-6 bg-[#00B4BF] hover:bg-[#116368] text-white px-3 py-1 rounded-lg ">
                {t("news.read-more")}
              </button>
            </a>
          </Link>

          <Link href="/news/invitation">
            <a className="group min-w-[250px] mx-4 md:mx-0">
              <div className="w-full aspect-w-9 aspect-h-6 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/news/news2/1.jpeg"
                  alt="News 1"
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 text-[#00B4BF] font-medium">
                October 11, 2021
              </div>
              <h3 className="mt-2 text-gray-700 font-medium">
                Undangan Seminar Nasional Teknik Perumahsakitan Indonesia Bagian
                Kedua
              </h3>
              <button className="mt-6 bg-[#00B4BF] hover:bg-[#116368] text-white px-3 py-1 rounded-lg ">
                {t("news.read-more")}
              </button>
            </a>
          </Link>

          {/* <!-- Put other news here --> */}
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default News;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "overview"])),
  },
});
