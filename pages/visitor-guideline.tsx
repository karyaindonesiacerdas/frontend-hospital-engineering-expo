/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const VisitorGuideline: NextPage = () => {
  const { t } = useTranslation("visitor");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="mt-4 text-[#00B4BF] uppercase text-xl font-bold text-center">
          {t("visitor-guideline.tag")}
        </div>
        <h3 className="mt-2 mb-6 md:mb-10 text-4xl font-bold text-gray-700 text-center">
          {t("visitor-guideline.title")}
        </h3>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-2 shadow-xl rounded-xl">
            <div className="mb-4">
              <img src="/visitor-guideline-1.png" alt="Guideline 1" />
            </div>
            <div className="mb-4">
              <img src="/visitor-guideline-2.png" alt="Guideline 2" />
            </div>
            <div className="mb-4">
              <img src="/visitor-guideline-3.png" alt="Guideline 3" />
            </div>
            <div className="mb-4">
              <img src="/visitor-guideline-4.png" alt="Guideline 4" />
            </div>
          </div>

          <ol className="max-w-5xl mx-auto leading-relaxed lg:text-lg lg:leading-relaxed text-gray-700 list-decimal space-y-4 pl-6">
            <li>
              {t("visitor-guideline.guideline-1")}{" "}
              <Link href="/register/visitor">
                <a className="text-[#00B4BF] hover:text-[#116368]">
                  https://hospital-engineering-expo.com/register/visitor
                </a>
              </Link>
            </li>
            <li>{t("visitor-guideline.guideline-2")}</li>
            <li>{t("visitor-guideline.guideline-3")}</li>
            <li>{t("visitor-guideline.guideline-4")}</li>
            <li>{t("visitor-guideline.guideline-5")}</li>
            <li>{t("visitor-guideline.guideline-6")}</li>
            <li>{t("visitor-guideline.guideline-7")}</li>
            <li>{t("visitor-guideline.guideline-8")}</li>
            <li>{t("visitor-guideline.guideline-9")}</li>
            <li>{t("visitor-guideline.guideline-10")}</li>
            <li>{t("visitor-guideline.guideline-11")}</li>
            <li>{t("visitor-guideline.guideline-12")}</li>
            <li>{t("visitor-guideline.guideline-13")}</li>
            <li>{t("visitor-guideline.guideline-14")}</li>
            <li>{t("visitor-guideline.guideline-15")}</li>
            <li>{t("visitor-guideline.guideline-16")}</li>
            <li>{t("visitor-guideline.guideline-17")}</li>
          </ol>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default VisitorGuideline;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "visitor"])),
  },
});
