import React from "react";
import Marquee from "react-fast-marquee";
import {
  Header,
  CTA,
  OrganizedBy,
  Footer,
  SponsoredBy,
} from "@/components/landing-page";

export const LandingPageLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto text-white rounded-md overflow-hidden backdrop-filter backdrop-blur-xl">
          <Marquee
            speed={90}
            gradient={true}
            gradientColor={[0, 132, 140]}
            className="h-10"
            // style={{ height: "2.6vw" }}
          >
            <div className="font-semibold">
              The 2nd day of the event will be held on October 16, 2021!
            </div>
          </Marquee>
        </div>
      </div>
      <Header />
      {children}
      <CTA />
      <SponsoredBy />
      <OrganizedBy />
      <Footer />
    </>
  );
};
