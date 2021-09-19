import React from "react";
import { useTranslation } from "next-i18next";

export const CountDown = () => {
  const { t } = useTranslation("home");

  return (
    <div className="mb-6 2xl:mb-10 py-6 2xl:py-10 px-6">
      <div className="text-center text-[#116368]  sm:text-lg md:text-xl uppercase font-medium tracking-wider">
        {t("countdown.tag")}
      </div>
      <div className="mt-4 grid grid-cols-4 md:gap-4 max-w-lg mx-auto">
        <div className="flex flex-col items-center text-[#116368] font-medium">
          <span id="day" className="text-3xl md:text-5xl">
            4
          </span>
          <span className="md:mt-1 text-sm sm:text-md">
            {t("countdown.days")}
          </span>
        </div>
        <div className="flex flex-col items-center text-[#116368] font-medium">
          <span id="hour" className="text-3xl md:text-5xl">
            15
          </span>
          <span className="md:mt-1 text-sm sm:text-md">
            {t("countdown.hours")}
          </span>
        </div>
        <div className="flex flex-col items-center text-[#116368] font-medium">
          <span id="minute" className="text-3xl md:text-5xl">
            45
          </span>
          <span className="md:mt-1 text-sm sm:text-md">
            {t("countdown.minutes")}
          </span>
        </div>
        <div className="flex flex-col items-center text-[#116368] font-medium">
          <span id="second" className="text-3xl md:text-5xl">
            12
          </span>
          <span className="md:mt-1 text-sm sm:text-md">
            {t("countdown.seconds")}
          </span>
        </div>
      </div>
    </div>
  );
};
