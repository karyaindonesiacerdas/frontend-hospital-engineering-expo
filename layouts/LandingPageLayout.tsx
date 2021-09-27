import React from "react";
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
      <Header />
      {children}
      <CTA />
      <SponsoredBy />
      <OrganizedBy />
      <Footer />
    </>
  );
};
