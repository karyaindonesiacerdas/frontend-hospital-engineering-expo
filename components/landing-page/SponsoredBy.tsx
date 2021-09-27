/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useTranslation } from "next-i18next";

export const SponsoredBy = () => {
  const { t } = useTranslation("home");

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto md:pt-20 pb-40 px-4">
        <h3 className="text-3xl text-gray-700 text-center font-medium">
          {t("sponsored-by")}
        </h3>
        <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-14">
          <div className="flex items-center justify-center">
            <img
              className="h-36 -ml-4"
              src="/sponsor/selaras-lawang-sewu.png"
              alt="Selaras Lawang Sewu Logo"
            />
          </div>
          <div className="flex items-center justify-center">
            <img
              className="h-36 -ml-4"
              src="/sponsor/inos-putra-mahkota.jpg"
              alt="PT Inos Putra Mahkota"
            />
          </div>
          <div className="flex items-center justify-center">
            <img className="h-36 -ml-4" src="/sponsor/kone.jpg" alt="KONE" />
          </div>
          <div className="flex items-center justify-center">
            <img
              className="h-36 -ml-4"
              src="/sponsor/socomec.jpeg"
              alt="Socomec"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
