import type { GetStaticPropsContext, NextPage } from "next";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { CountDown, Event, BlogAndNews } from "@/components/landing-page";

const Hero = dynamic(() => import("@/components/landing-page/Hero"));

const Home: NextPage = () => {
  return (
    <LandingPageLayout>
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
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
