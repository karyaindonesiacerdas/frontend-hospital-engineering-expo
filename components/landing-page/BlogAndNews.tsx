import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export const BlogAndNews = () => {
  const { t } = useTranslation("home");

  return (
    <section className="max-w-7xl mx-auto pt-4 pb-10 bg-white">
      <h2 className="text-[#116368] text-xl uppercase tracking-wider px-4 md:px-2">
        {t("blog.header")}
      </h2>
      <h3 className="mt-2 mb-10 text-4xl font-bold text-gray-700 px-4 md:px-2">
        {t("blog.subheader")}
      </h3>

      <div className="flex lg:grid gap-10 grid-cols-3 md:grid-cols-2 xl:grid-cols-3 overflow-x-auto md:px-2">
        {/* News 1 */}
        <a href="news1.html" className="group min-w-[250px] mx-4 md:mx-0">
          <div className="w-full aspect-w-9 aspect-h-6 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              layout="fill"
              src="/brosur1.jpg"
              alt="News 1"
              className="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <div className="mt-4 text-primary font-medium">September 1, 2021</div>
          <h3 className="mt-2 text-gray-700 font-medium">
            IAHE Announces its First Hospital Engineering Forum
          </h3>
          <button className="mt-6 bg-primary hover:bg-[#116368] text-white px-3 py-1 rounded-lg ">
            {t("blog.read-more")}
          </button>
        </a>
      </div>
    </section>
  );
};
