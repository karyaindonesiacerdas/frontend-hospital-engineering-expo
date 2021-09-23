/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useTranslation } from "next-i18next";

export const Footer = () => {
  const { t } = useTranslation("home");

  return (
    <>
      {/* Contact */}
      <section className="bg-[#25243A]">
        <div className="max-w-7xl mx-auto pt-6 md:pt-20 md:pb-28 px-4 grid md:grid-cols-2 gap-6 items-center overflow-hidden">
          <div>
            <div className="text-[#00B4BF] uppercase font-medium text-lg tracking-widest">
              {t("contact.tag")}
            </div>
            <h3 className="mt-2 text-3xl font-bold text-white">
              {t("contact.title")}
            </h3>
            <div className="mt-10 flex flex-col space-y-8">
              <div className="flex space-x-3 items-start">
                <div className="border border-gray-600 rounded-full w-10 h-10 flex items-center justify-center">
                  <img className="w-4" src="/icons/address.svg" alt="Address" />
                </div>
                <span className="flex-1 max-w-[350px] text-sm md:text-md text-white mt-0.5">
                  {t("contact.address")}
                </span>
              </div>

              <div className="flex space-x-3 items-start">
                <div className="border border-gray-600 rounded-full w-10 h-10 flex items-center justify-center">
                  <img className="w-4" src="/icons/phone.svg" alt="Phone" />
                </div>
                <div className="flex-1 max-w-[350px] text-sm md:text-md text-white mt-0.5 flex flex-col space-y-2">
                  <span>{t("contact.whatsapp1")}</span>
                  <span>{t("contact.whatsapp2")}</span>
                </div>
              </div>

              <div className="flex space-x-3 items-start">
                <div className="border border-gray-600 rounded-full w-10 h-10 flex items-center justify-center">
                  <img className="w-4" src="/icons/email.svg" alt="Email" />
                </div>
                <span className="flex-1 max-w-[350px] text-sm md:text-md text-white mt-0.5">
                  {t("contact.email")}
                </span>
              </div>
            </div>
          </div>

          <div>
            {/* <!-- Ganti dengan google maps --> */}
            <div className="aspect-w-5 aspect-h-3 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1407117932863!2d106.84116471529533!3d-6.245180562891369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3b85bf3e09d%3A0x160234e756fdf17b!2sWisma%20NH!5e0!3m2!1sid!2sid!4v1631966539831!5m2!1sid!2sid"
                title="Address"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <footer className="bg-[#25243A]">
        <div className="max-w-7xl mx-auto py-6 px-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-gray-400 text-sm self-center justify-self-center md:justify-self-start">
            Copyright &copy; Hospital Engineering Expo 2021
          </div>
          <div className="flex space-x-4 self-center justify-self-center ">
            <a
              className="text-gray-400 hover:text-white"
              href="https://facebook.com"
            >
              <span className="sr-only">Facebook Link</span>
              <svg
                className="fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
              </svg>
            </a>
            <a
              className="text-gray-400 hover:text-white"
              href="https://twitter.com"
            >
              <span className="sr-only">Twitter Link</span>

              <svg
                className="fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
              </svg>
            </a>
            <a
              className="text-gray-400 hover:text-white"
              href="https://linkedin.com"
            >
              <span className="sr-only">Linked in Link</span>

              <svg
                className="fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
              </svg>
            </a>
          </div>
          <div className="flex space-x-4 self-center justify-self-center md:justify-self-end">
            <a className="text-gray-400 hover:text-white text-sm" href="#">
              Privacy Policy
            </a>
            <a className="text-gray-400 hover:text-white text-sm" href="#">
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
