import React from "react";
import { Header, CTA, OrganizedBy, Footer } from "@/components/landing-page";

export const LandingPageLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <CTA />
      <OrganizedBy />
      <Footer />
    </>
  );
};
