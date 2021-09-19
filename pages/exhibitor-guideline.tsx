/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const ExhibitorGuideline: NextPage = () => {
  const { t } = useTranslation("exhibitor");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="mt-4 text-primary uppercase text-xl font-bold text-center">
          {t("exhibitor-guideline.tag")}
        </div>
        <h3 className="mt-2 mb-6 md:mb-10 text-4xl font-bold text-gray-700 text-center">
          {t("exhibitor-guideline.title")}
        </h3>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-2 shadow-xl rounded-xl">
            <div className="mb-4">
              <img src="/exhibitor-guideline-1.png" alt="Guideline 1" />
            </div>
            <div className="mb-4">
              <img src="/exhibitor-guideline-2.png" alt="Guideline 2" />
            </div>
            <div className="mb-4">
              <img src="/exhibitor-guideline-3.png" alt="Guideline 3" />
            </div>
          </div>

          <ol className="max-w-5xl mx-auto leading-relaxed lg:text-lg lg:leading-relaxed text-gray-700 list-decimal space-y-4 pl-6">
            <li>
              {t("exhibitor-guideline.guideline-1")}{" "}
              <Link href="/register/exhibitor">
                <a className="text-primary hover:text-[#116368]">
                  https://hospital-engineering-expo.com/register/exhibitor
                </a>
              </Link>
            </li>
            <li>{t("exhibitor-guideline.guideline-2")}</li>
            <li>{t("exhibitor-guideline.guideline-3")}</li>
            <li>{t("exhibitor-guideline.guideline-4")}</li>
            <li>{t("exhibitor-guideline.guideline-5")}</li>
            <li>{t("exhibitor-guideline.guideline-6")}</li>
            <li>{t("exhibitor-guideline.guideline-7")}</li>
            <li>{t("exhibitor-guideline.guideline-8")}</li>
            <li>{t("exhibitor-guideline.guideline-9")}</li>
            <li>{t("exhibitor-guideline.guideline-10")}</li>
            <li>{t("exhibitor-guideline.guideline-11")}</li>
            <li>{t("exhibitor-guideline.guideline-12")}</li>
            <li>{t("exhibitor-guideline.guideline-13")}</li>
            <li>{t("exhibitor-guideline.guideline-14")}</li>
          </ol>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default ExhibitorGuideline;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "exhibitor"])),
  },
});
