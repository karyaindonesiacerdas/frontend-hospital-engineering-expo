import { useEffect } from "react";
import type { GetStaticPropsContext, NextPage } from "next";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { CountDown, Event, BlogAndNews } from "@/components/landing-page";

const Hero = dynamic(() => import("@/components/landing-page/Hero"));

const Home: NextPage = () => {
  const { t } = useTranslation("seo");

  useEffect(() => {
    const tracking = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracker`, {
          method: "POST",
        });

        if (!res.ok) {
          throw new Error("Error create tracking");
        }

        await res.json();
      } catch (error) {
        console.log({ error });
      }
    };
    tracking();
  }, []);

  return (
    <LandingPageLayout>
      <NextSeo
        title={t("index.title")}
        description={t("index.description")}
        twitter={{
          handle: "@handle",
          site: "hospital-engineering-expo.com",
          cardType: "summary_large_image",
        }}
      />
      <Hero />
      {/* Count Down, Event */}
      <section className="relative bg-gradient-to-b from-[#1DBAC4] to-white pb-10 lg:pb-20 lg:min-h-screen z-0">
        <CountDown />
        <Event />
      </section>

      <BlogAndNews />
    </LandingPageLayout>
  );
};

export default Home;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "seo"])),
  },
});
