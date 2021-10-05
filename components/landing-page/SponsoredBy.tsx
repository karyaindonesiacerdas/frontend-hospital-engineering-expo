/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useTranslation } from "next-i18next";
import Marquee from "react-fast-marquee";

export const SponsoredBy = () => {
  const { t } = useTranslation("home");

  return (
    <section className="bg-white">
      <div className="md:pt-20 pb-40 px-4">
        <h3 className="text-3xl text-gray-700 text-center font-medium">
          {t("sponsored-by")}
        </h3>
        <div className="max-w-7xl mx-auto mt-10 grid-cols-2 md:grid-cols-3 gap-8 md:gap-20 hidden md:grid">
          <div className="flex items-center justify-center h-36 p-2">
            <img
              className="object-contain h-full"
              src="/sponsor/socomec.png"
              alt="Socomec"
            />
          </div>
          <div className="flex items-center justify-center h-36">
            <img
              className="object-contain h-full"
              src="/sponsor/matesu.png"
              alt="matesu"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-2">
            <img
              className="object-contain h-full"
              src="/sponsor/perdana-niaga-perkasa.png"
              alt="PNP"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-2">
            <img
              className="object-contain h-full"
              src="/sponsor/kawan-abadi-selaras.png"
              alt="kas"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-2">
            <img
              className="object-contain h-full"
              src="/sponsor/selaras-lawang-sewu.png"
              alt="Selaras Lawang Sewu Logo"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-2">
            <img
              className="object-contain h-full"
              src="/sponsor/kone.png"
              alt="KONE"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-2">
            <img
              className="object-contain h-full"
              src="/sponsor/medisain.jpg"
              alt="medisain"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-2">
            <img
              className="object-contain h-full"
              src="/sponsor/chint-electric.png"
              alt="Chint Electric"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-8">
            <img
              className="object-contain h-full"
              src="/sponsor/legrand.png"
              alt="lengrad"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-6">
            <img
              className="object-contain h-full"
              src="/sponsor/tica.png"
              alt="TICA"
            />
          </div>
          <div className="flex items-center justify-center h-36">
            <img
              className="object-contain h-full"
              src="/sponsor/inos-putra-mahkota.png"
              alt="PT Inos Putra Mahkota"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-2">
            <img
              className="object-contain h-full"
              src="/sponsor/metropolitan-bayu-industri.png"
              alt="MBI"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-6">
            <img
              className="object-contain h-full"
              src="/sponsor/pengsulindo.png"
              alt="Pengsulindo"
            />
          </div>
          <div className="flex items-center justify-center h-36 p-2">
            <img
              className="object-contain h-full"
              src="/sponsor/sigmatech.jpg"
              alt="Sigmatech"
            />
          </div>
          <div className="flex items-center justify-center h-36">
            <img
              className="object-contain h-full"
              src="/sponsor/bio-teknologi.png"
              alt="Bio Teknologi"
            />
          </div>
        </div>
        <div className="md:hidden">
          <Marquee className="mt-10" gradientWidth={30} speed={100}>
            <div className="flex items-center justify-center h-24 mx-6 p-2">
              <img
                className="object-contain h-full"
                src="/sponsor/socomec.png"
                alt="Socomec"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6">
              <img
                className="object-contain h-full"
                src="/sponsor/matesu.png"
                alt="matesu"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-2">
              <img
                className="object-contain h-full"
                src="/sponsor/perdana-niaga-perkasa.png"
                alt="PNP"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-2">
              <img
                className="object-contain h-full"
                src="/sponsor/kawan-abadi-selaras.png"
                alt="kas"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-2">
              <img
                className="object-contain h-full"
                src="/sponsor/selaras-lawang-sewu.png"
                alt="Selaras Lawang Sewu Logo"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-2">
              <img
                className="object-contain h-full"
                src="/sponsor/kone.png"
                alt="KONE"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-2">
              <img
                className="object-contain h-full"
                src="/sponsor/medisain.jpg"
                alt="medisain"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-2">
              <img
                className="object-contain h-full"
                src="/sponsor/chint-electric.png"
                alt="Chint Electric"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-6">
              <img
                className="object-contain h-full"
                src="/sponsor/legrand.png"
                alt="lengrad"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-6">
              <img
                className="object-contain h-full"
                src="/sponsor/tica.png"
                alt="TICA"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6">
              <img
                className="object-contain h-full"
                src="/sponsor/inos-putra-mahkota.png"
                alt="PT Inos Putra Mahkota"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-2">
              <img
                className="object-contain h-full"
                src="/sponsor/metropolitan-bayu-industri.png"
                alt="MBI"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-4">
              <img
                className="object-contain h-full"
                src="/sponsor/pengsulindo.png"
                alt="Pengsulindo"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6 p-2">
              <img
                className="object-contain h-full"
                src="/sponsor/sigmatech.jpg"
                alt="Sigmatech"
              />
            </div>
            <div className="flex items-center justify-center h-24 mx-6">
              <img
                className="object-contain h-full"
                src="/sponsor/bio-teknologi.png"
                alt="Bio Teknologi"
              />
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};
