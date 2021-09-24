import { useState, useContext, useEffect } from "react";
import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parseCookies } from "nookies";

import { AuthPageLayout } from "@/layouts/AuthPageLayout";
import { useAuth } from "@/contexts/auth.context";
import { SubmitButton } from "@/components/common";

type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: NextPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("auth");
  const { login, isAuthenticated, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });
  const cookies = parseCookies();

  useEffect(() => {
    if (!isLoading && isAuthenticated && cookies.access_token && cookies.user) {
      router.push("/main-hall");
    }
  }, [isAuthenticated, isLoading, router, cookies.access_token, cookies.user]);

  const onSubmit: SubmitHandler<LoginInputs> = async ({ email, password }) => {
    try {
      await login({ email, password });
      toast.success("Logged in");
      await router.push("/main-hall");
    } catch (error) {
      toast.error("Invalid Credentials");
      // console.log({ error });
    }
  };

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

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <!-- Email --> */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("email")}
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                autoComplete="username"
                className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#00B4BF] focus:border-[#00B4BF] sm:text-sm border-gray-300"
                {...register("email")}
              />
              {errors?.email && (
                <span className="text-sm text-red-500">
                  {errors?.email?.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("password")}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="password"
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                className="focus:outline-none pl-3 py-2 focus:ring-[#00B4BF] focus:border-[#00B4BF] block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center "
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors?.password && (
              <span className="text-sm text-red-500">
                {errors?.password?.message}
              </span>
            )}
          </div>

          <div>
            <SubmitButton
              isLoading={isSubmitting}
              i18nText="login"
            ></SubmitButton>
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
