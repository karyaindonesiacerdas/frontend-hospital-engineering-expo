import { useState } from "react";
import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

import { AuthPageLayout } from "@/layouts/AuthPageLayout";

const Login: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("auth");

  return (
    <AuthPageLayout>
      <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10 max-w-md">
        <div className="flex flex-col items-center space-y-0.5 mb-10">
          <Link href="/">
            <a className="mb-1 flex flex-col items-center space-y-1">
              <Image
                width={40}
                height={40}
                className="object-contain w-12 h-12"
                src="/ptpi.png"
                alt="logo ptpi"
              />
              <span className="text-2xl font-bold text-[#00B4BF]">
                HEF 2021
              </span>
            </a>
          </Link>
          <h2 className="text-2xl font-bold text-center">{t("login-tag")}</h2>
        </div>

        <form action="#" className="space-y-4" method="POST">
          {/* <!-- Email --> */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("email")}
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#00B4BF] focus:border-[#00B4BF] sm:text-sm border-gray-300"
              />
              <span className="text-sm text-red-500">Input error</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("password")}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="focus:outline-none pl-3 py-2 focus:ring-[#00B4BF] focus:border-[#00B4BF] block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Link href="/main-hall">
              <a
                // type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white transition-all bg-[#00B4BF] hover:bg-[#116368] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B4BF]"
              >
                {t("login")}
              </a>
            </Link>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t("or")}</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <Link href="/register/visitor">
                <a className="w-full inline-flex justify-center py-2 px-1 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>{t("register-as-visitor")}</span>
                </a>
              </Link>
            </div>

            <div>
              <Link href="/register/exhibitor">
                <a className="w-full inline-flex justify-center py-2 px-1 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>{t("register-as-exhibitor")}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default Login;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "auth"])),
  },
});
