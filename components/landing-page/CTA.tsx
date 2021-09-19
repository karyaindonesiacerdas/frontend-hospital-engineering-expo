import React from "react";
import { useTranslation } from "next-i18next";

export const CTA = () => {
  const { t } = useTranslation("home");

  return (
    <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
      <h3 className="mt-2 mb-10 text-4xl font-bold text-gray-700 uppercase">
        {t("cta.tag")}
      </h3>
      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        <div>
          <div
            style={{ backgroundImage: "url('/cta-exhibitor.png')" }}
            className="h-40 md:h-72 w-auto rounded-xl flex items-center justify-center relative overflow-hidden bg-center bg-cover"
          >
            <div
              className="absolute inset-0 w-full h-full"
              style={{ background: "rgba(1, 152, 162, 0.34)" }}
            ></div>
            <div className="flex flex-col items-center mt-4">
              <div
                className="text-md md:text-4xl font-extrabold text-white uppercase tracking-widest mb-4 z-10"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
              >
                Exhibitor
              </div>
              <a
                href="register-exhibitor.html"
                className="bg-[#4A4A4A] text-white text-xs sm:text-md py-1 px-2 rounded-md md:rounded-lg uppercase tracking-wider font-medium shadow-2xl hover:shadow-none z-10"
              >
                {t("cta.register-here")}
              </a>
            </div>
          </div>
          <p className="mt-4 px-2 line-clamp-3 text-gray-600">
            {t("cta.exhibitor-content")}
          </p>
        </div>

        <div>
          <div
            style={{ backgroundImage: "url('/cta-visitor.png')" }}
            className="h-40 md:h-72 w-auto rounded-xl flex items-center justify-center relative overflow-hidden bg-cover bg-center"
          >
            <div
              className="absolute inset-0 w-full h-full"
              style={{ background: "rgba(1, 152, 162, 0.34)" }}
            ></div>
            <div className="flex flex-col items-center mt-4">
              <div
                className="text-md md:text-4xl font-extrabold text-white uppercase tracking-widest mb-4 z-10"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
              >
                Visitor
              </div>
              <a
                href="register-visitor.html"
                className="bg-[#4A4A4A] text-white text-xs sm:text-md py-1 px-2 rounded-md md:rounded-lg uppercase tracking-wider font-medium shadow-2xl hover:shadow-none z-10"
              >
                {t("cta.register-here")}
              </a>
            </div>
          </div>
          <p className="mt-4 px-2 line-clamp-3 text-gray-600">
            {t("cta.visitor-content")}
          </p>
        </div>
      </div>
    </section>
  );
};
