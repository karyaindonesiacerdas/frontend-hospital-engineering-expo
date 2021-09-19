/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const Programs: NextPage = () => {
  const { t } = useTranslation("overview");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-700 text-center px-2 mb-6 md:mb-10">
          Programs
        </h2>
        {/* <!-- Programs 1 --> */}
        <div className="lg:mt-4 grid lg:grid-cols-2 px-2 gap-14 items-center mb-10 lg:mb-20">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-700 text-center lg:text-left px-2 mb-2">
              {t("programs.program-1.title")}
            </h3>
            <h4 className="px-2 mb-4 text-gray-500 italic text-xl">
              {t("programs.program-1.tag")}
            </h4>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 px-2">
              {t("programs.program-1.content")}
            </p>
          </div>
          <div style={{ perspective: "1000px" }}>
            <div
              className="aspect-w-3 aspect-h-2"
              style={{ transform: "rotateY(-15deg) rotateX(5deg)" }}
            >
              <Image
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
                src="/seminar-room-frame.png"
                alt="About HEF"
              />
            </div>
          </div>
        </div>

        {/* <!-- Programs 2 --> */}
        <div className="lg:mt-4 grid lg:grid-cols-2 px-2 gap-14 items-center mb-10 lg:mb-20">
          <div className="order-first md:order-last">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-700 text-center lg:text-left px-2 mb-4">
              {t("programs.program-2.title")}
            </h3>
            <h4 className="px-2 mb-4 text-gray-500 italic text-xl">
              {t("programs.program-2.tag")}
            </h4>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 px-2">
              {t("programs.program-2.content")}
            </p>
          </div>
          <div style={{ perspective: "1000px" }}>
            <div
              className="aspect-w-3 aspect-h-2"
              style={{ transform: "rotateY(15deg) rotateX(5deg)" }}
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
        </div>

        {/* <!-- Programs 3 --> */}
        <div className="lg:mt-4 grid lg:grid-cols-2 px-2 gap-14 items-center mb-10 lg:mb-20">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-700 text-center lg:text-left px-2 mb-4">
              {t("programs.program-3.title")}
            </h3>
            <h4 className="px-2 mb-4 text-gray-500 italic text-xl">
              {t("programs.program-3.tag")}
            </h4>
            <p className="max-w-5xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 px-2">
              {t("programs.program-3.content")}
            </p>
          </div>
          <div style={{ perspective: "1000px" }}>
            <div
              className="aspect-w-3 aspect-h-2"
              style={{ transform: "rotateY(-15deg) rotateX(5deg)" }}
            >
              <Image
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
                src="/business-matching-frame.png"
                alt="About HEF"
              />
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default Programs;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "overview"])),
  },
});
