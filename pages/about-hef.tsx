import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const AboutHEF: NextPage = () => {
  const { t } = useTranslation("overview");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="text-[#00B4BF] uppercase text-xl font-bold text-center">
          {t("about-hef.tag")}
        </div>
        <h3 className="mt-2 mb-6 md:mb-10 text-4xl font-bold text-gray-700 up text-center">
          {t("about-hef.title")}
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
              {t("about-hef.content")}
            </p>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default AboutHEF;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "overview"])),
  },
});
