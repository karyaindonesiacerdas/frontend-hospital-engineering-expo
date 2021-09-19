/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const Packages: NextPage = () => {
  const { t } = useTranslation("exhibitor");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="text-[#00B4BF] uppercase text-xl font-bold text-center">
          {t("packages.tag")}
        </div>
        <h3 className="mt-2 mb-6 md:mb-10 text-4xl font-bold text-gray-700 text-center">
          {t("packages.title")}
        </h3>
        <div className="max-w-5xl mx-auto">
          <p className="md:text-lg leading-relaxed lg:leading-relaxed text-gray-600 text-center">
            {t("packages.content")}
          </p>
          <div className="my-4 aspect-w-2 aspect-h-3">
            <Image
              layout="fill"
              objectFit="contain"
              src="/packages.png"
              alt="Packages"
            />
          </div>
          <p className="max-w-5xl text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 text-center">
            {t("packages.help-text")}
          </p>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default Packages;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "exhibitor"])),
  },
});
