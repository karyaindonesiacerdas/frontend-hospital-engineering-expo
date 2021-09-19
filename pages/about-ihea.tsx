import type { GetStaticPropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const AboutIHEA: NextPage = () => {
  const { t } = useTranslation("overview");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      {/* Content */}
      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="mt-4 text-[#00B4BF] uppercase text-xl font-bold text-center">
          {t("about-ihea.tag")}
        </div>
        <h3 className="mt-2 mb-6 md:mb-10 text-4xl font-bold text-gray-700 text-center">
          {t("about-ihea.title")}
        </h3>
        <p className="max-w-4xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600">
          {t("about-ihea.overview")}
        </p>
        <div className="mx-auto max-w-5xl text-center text-[#00B4BF] text-xl font-bold mt-10 mb-6">
          {t("about-ihea.why-tag")}
        </div>
        <ol className="max-w-4xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 list-decimal space-y-4 pl-6">
          <li>{t("about-ihea.why-1")}</li>
          <li>{t("about-ihea.why-2")}</li>
          <li>{t("about-ihea.why-3")}</li>
          <li>{t("about-ihea.why-4")}</li>
          <li>{t("about-ihea.why-5")}</li>
          <li>{t("about-ihea.why-6")}</li>
          <li>{t("about-ihea.why-7")}</li>
          <li>{t("about-ihea.why-8")}</li>
          <li>{t("about-ihea.why-9")}</li>
          <li>{t("about-ihea.why-10")}</li>
          <li>{t("about-ihea.why-11")}</li>
          <li>{t("about-ihea.why-12")}</li>
        </ol>
      </section>
    </LandingPageLayout>
  );
};

export default AboutIHEA;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "overview"])),
  },
});
