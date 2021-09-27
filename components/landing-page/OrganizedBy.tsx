/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useTranslation } from "next-i18next";

export const OrganizedBy = () => {
  const { t } = useTranslation("home");

  return (
    <section className="bg-gradient-to-b from-white via-white to-primary-50">
      <div className="max-w-7xl mx-auto md:pt-20 pb-40 px-4">
        <h3 className="text-3xl text-gray-700 text-center font-medium">
          {t("organized-by")}
        </h3>
        <div className="mt-10 flex justify-center">
          <img
            className="block md:hidden h-28 -ml-4"
            src="/kic-small.png"
            alt="Logo KIC"
          />
          <img
            className="hidden md:block h-28 -ml-4"
            src="/kic.png"
            alt="Logo KIC"
          />
        </div>
      </div>
    </section>
  );
};
