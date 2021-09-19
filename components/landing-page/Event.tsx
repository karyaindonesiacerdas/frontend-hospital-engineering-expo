/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useTranslation } from "next-i18next";

export const Event = () => {
  const { t } = useTranslation("home");

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-2 py-3 2xl:py-6 flex flex-col lg:flex-row lg:items-center z-10">
      <div>
        <div className="text-[#063C40] uppercase text-2xl tracking-widest font-semibold text-center md:text-left">
          {t("countdown.event-tag")}
        </div>
        <h2 className="mt-1 text-5xl 2xl:text-6xl text-[#063C40] font-extrabold md:max-w-md text-center md:text-left">
          {t("countdown.event-title")}
        </h2>
        <div className="mt-4 text-xl uppercase tracking-widest font-medium text-center md:text-left">
          {t("countdown.event-date")}
        </div>
      </div>
      <div className="mt-6 2xl:mt-0 flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-5 p-2 max-w-xl md:max-w-3xl mx-auto">
        <a
          href="about-hef.html"
          className="bg-white flex flex-col items-center py-2 px-2 md:py-6 md:px-6 rounded-3xl shadow-2xl hover:shadow-none"
        >
          <img
            className="w-12 md:w-20"
            src="/icons/about-hew.svg"
            alt="About HEF 2021"
          />
          <span className="mt-4 uppercase font-medium tracking-wider text-xs md:text-sm text-center">
            About HEF 2021
          </span>
        </a>
        <a
          href="register-exhibitor.html"
          className="bg-white flex flex-col items-center py-2 px-2 md:py-6 md:px-6 rounded-3xl shadow-2xl hover:shadow-none"
        >
          <img
            className="w-12 md:w-20"
            src="/icons/register-exhibitor.svg"
            alt="Register as Exhibitor"
          />
          <span className="mt-4 uppercase font-medium tracking-wider text-xs md:text-sm text-center">
            Register as Exhibitor
          </span>
        </a>
        <a
          href="why-exhibit.html"
          className="bg-white flex flex-col items-center py-2 px-2 md:py-6 md:px-6 rounded-3xl shadow-2xl hover:shadow-none"
        >
          <img
            className="w-12 md:w-20"
            src="/icons/why-visit.svg"
            alt="Why Visit?"
          />
          <span className="mt-4 uppercase font-medium tracking-wider text-xs md:text-sm text-center">
            Why Exhibit?
          </span>
        </a>
        <a
          href="exhibitor-guideline.html"
          className="bg-white flex flex-col items-center py-2 px-2 md:py-6 md:px-6 rounded-3xl shadow-2xl hover:shadow-none"
        >
          <img
            className="w-12 md:w-20"
            src="/icons/exhibitor-list.svg"
            alt="Exhibitor List 2021"
          />
          <span className="mt-4 uppercase font-medium tracking-wider text-xs md:text-sm text-center">
            Exhibitor Guideline
          </span>
        </a>
        <a
          href="webinar-rundown.html"
          className="bg-white flex flex-col items-center py-2 px-2 md:py-6 md:px-6 rounded-3xl shadow-2xl hover:shadow-none"
        >
          <img
            className="w-12 md:w-20"
            src="/icons/seminar-rundown.svg"
            alt="Seminar Rundown"
          />
          <span className="mt-4 uppercase font-medium tracking-wider text-xs md:text-sm text-center">
            Seminar Rundown
          </span>
        </a>
        <a
          href="register-visitor.html"
          className="bg-white flex flex-col items-center py-2 px-2 md:py-6 md:px-6 rounded-3xl shadow-2xl hover:shadow-none"
        >
          <img
            className="w-12 md:w-20"
            src="/icons/register-visitor.svg"
            alt="Register as Visitor"
          />
          <span className="mt-4 uppercase font-medium tracking-wider text-xs md:text-sm text-center">
            Register as Visitor
          </span>
        </a>
        <a
          href="why-attend.html"
          className="bg-white flex flex-col items-center py-2 px-2 md:py-6 md:px-6 rounded-3xl shadow-2xl hover:shadow-none"
        >
          <img
            className="w-12 md:w-20"
            src="/icons/why-visit-2.svg"
            alt="Why Visit"
          />
          <span className="mt-4 uppercase font-medium tracking-wider text-xs md:text-sm text-center">
            Why Visit
          </span>
        </a>
        <a
          href="visitor-guideline.html"
          className="bg-white flex flex-col items-center py-2 px-2 md:py-6 md:px-6 rounded-3xl shadow-2xl hover:shadow-none"
        >
          <img
            className="w-12 md:w-20"
            src="/icons/sponsor-partner.svg"
            alt="Sponsorship and Partner"
          />
          <span className="mt-4 uppercase font-medium tracking-wider text-xs md:text-sm text-center">
            Visitor Guideline
          </span>
        </a>
      </div>
    </div>
  );
};
