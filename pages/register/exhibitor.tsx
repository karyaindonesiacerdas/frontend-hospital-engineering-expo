import { useState, useEffect } from "react";
import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";

import { AuthPageLayout } from "@/layouts/AuthPageLayout";
import { countries } from "@/data/countries";
import { provinces } from "@/data/provinces";
import { SubmitButton } from "@/components/common";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth.context";

type Inputs = {
  email: string;
  mobile: string;
  name: string;
  job_function: string;
  password: string;
  password_confirmation: string;
  company_name: string;
  company_website: string;
  country: string;
  province: string;
  business_nature: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  mobile: yup.string().required("Mobile / Whatsapp is required"),
  name: yup.string().required("Name is required"),
  job_function: yup.string().required("Job function is required"),
  password: yup.string().min(8).required("Password is required"),
  password_confirmation: yup
    .string()
    .required("Password confirmation is required"),
  company_name: yup.string().required("Company name is required"),
  country: yup.string().required("Country is required"),
});

const RegisterExhibitor: NextPage = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"account-info" | "packages">(
    "account-info"
  );
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("auth");
  const { isAuthenticated, isLoading, registerExhibitor } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    watch,
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const cookies = parseCookies();
  const passwordWatch = watch("password");
  const confirmPasswordWatch = watch("password_confirmation");
  const countryWatch = watch("country");

  // =================================
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_WEB_STATUS === "maintenance") {
      router.push("/maintenance");
    }
  }, [router]);
  // =================================

  useEffect(() => {
    if (!isLoading && isAuthenticated && cookies.access_token && cookies.user) {
      router.push("/main-hall");
    }
  }, [isAuthenticated, isLoading, router, cookies.access_token, cookies.user]);

  useEffect(() => {
    if (
      passwordWatch &&
      confirmPasswordWatch &&
      passwordWatch !== confirmPasswordWatch
    ) {
      setError("password", { message: "Password not match" });
      setError("password_confirmation", { message: "Password not match" });
    } else {
      clearErrors("password");
      clearErrors("password_confirmation");
    }
  }, [passwordWatch, confirmPasswordWatch, setError, clearErrors]);

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const {
      email,
      mobile,
      name,
      job_function,
      password,
      password_confirmation,
      company_name,
      company_website,
      country,
      province,
      business_nature,
    } = values;
    // console.log({ values });
    try {
      await registerExhibitor({
        email,
        mobile,
        name,
        job_function,
        password,
        password_confirmation,
        company_name,
        company_website,
        country,
        province: country !== "Indonesia" ? "-" : province,
        business_nature,
        role: "exhibitor",
      });
      toast.success("Registration Successful. Please login");
      await router.push("/login");
    } catch (error) {
      toast.error("Registration Failed. Email already exists");
      // console.log({ error });
    }
  };

  return (
    <AuthPageLayout>
      <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
        <div className="flex flex-col items-center space-y-0.5 mb-8">
          <Image
            width={40}
            height={40}
            className="object-contain w-12 h-12"
            src="/ptpi.png"
            alt="logo ptpi"
          />
          <Link href="/">
            <a className="text-2xl font-bold text-primary">HEF 2021</a>
          </Link>
          <h2 className="text-3xl font-bold">{t("register-as-exhibitor")}</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden">
            <nav
              className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
              aria-label="Tabs"
            >
              <button
                type="button"
                className="text-gray-900 rounded-l-lg  group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                onClick={() => setSelectedTab("account-info")}
              >
                <span>Account & Company Info</span>
                <span
                  aria-hidden="true"
                  className="bg-primary absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              </button>

              <button
                type="button"
                className="text-gray-500 hover:text-gray-700   group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                onClick={() => setSelectedTab("packages")}
              >
                <span>Packages</span>
                <span
                  aria-hidden="true"
                  className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              </button>
            </nav>
          </div>

          {/* <!-- Account & Company Info --> */}
          <div
            className={`mb-6 ${
              selectedTab === "account-info" ? "block" : "hidden"
            }`}
          >
            {/* <!-- Account Information --> */}
            <div>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t("account-info")}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                {/* <!-- Email --> */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("email")}
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="email"
                      type="email"
                      className="input-text"
                      {...register("email")}
                    />
                    {/* <!-- Error Text --> */}
                    {errors?.email && (
                      <span className="text-sm text-red-500">
                        {errors?.email?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* <!-- Mobile (Whatsapp) --> */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("mobile")}
                  </label>
                  <div className="mt-1">
                    <input
                      id="mobile"
                      type="number"
                      className="input-text"
                      {...register("mobile")}
                    />
                    {/* <!-- Error Text --> */}
                    {errors?.mobile && (
                      <span className="text-sm text-red-500">
                        {errors?.mobile?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* <!-- Full Name (with title) --> */}
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("name")}
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="fullname"
                      className="input-text"
                      {...register("name")}
                    />
                    {/* <!-- Error Text --> */}
                    {errors?.name && (
                      <span className="text-sm text-red-500">
                        {errors?.name?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* <!-- Job Function --> */}
                <div>
                  <label
                    htmlFor="job"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Function
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <select
                      id="job"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                      {...register("job_function")}
                    >
                      <option value="">{t("choose")}</option>
                      <option value="Administration/ Office Management">
                        Administration/ Office Management
                      </option>
                      <option value="Architect">Architect</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Director">Director</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Finance and Accounting">
                        Finance and Accounting
                      </option>
                      <option value="Human Resource">Human Resource</option>
                      <option value="Legal">Legal</option>
                      <option value="Logistic, Purchasing, & Procurement">
                        Logistic, Purchasing, & Procurement
                      </option>
                      <option value="Manager">Manager</option>
                      <option value="Manufacturing & Production">
                        Manufacturing & Production
                      </option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operatin Management">
                        Operatin Management
                      </option>
                      <option value="Programmer/ Information and Communication Technology">
                        Programmer/ Information and Communication Technology
                      </option>
                      <option value="Research and Development">
                        Research and Development
                      </option>
                      <option value="Sales">Sales</option>
                      <option value="Supply Management">
                        Supply Management
                      </option>
                      <option value="Technician">Technician</option>
                      <option value="Other">Other</option>
                    </select>
                    {/* <!-- Error Text --> */}
                    {errors?.job_function && (
                      <span className="text-sm text-red-500">
                        {errors?.job_function?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* <!-- Password --> */}
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
                      type={showPassword ? "text" : "password"}
                      className="input-password"
                      {...register("password")}
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
                  {errors?.password && (
                    <span className="text-sm text-red-500">
                      {errors?.password?.message}
                    </span>
                  )}
                </div>

                {/* <!-- Confirm Password --> */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("confirm-password")}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      className="input-password"
                      {...register("password_confirmation")}
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
                  {errors?.password_confirmation && (
                    <span className="text-sm text-red-500">
                      {errors?.password_confirmation?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* <!-- Company Information --> */}
            <div>
              <div className="relative mb-4 mt-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t("company-info")}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                {/* <!-- Company Name --> */}
                <div>
                  <label
                    htmlFor="company-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("company-name")}
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="company-name"
                      className="input-text"
                      {...register("company_name")}
                    />
                    {/* <!-- Error Text --> */}
                    {errors?.company_name && (
                      <span className="text-sm text-red-500">
                        {errors?.company_name?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* <!-- Company Website --> */}
                <div>
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("company-website")}
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="company-website"
                      className="input-text"
                      {...register("company_website")}
                    />
                  </div>
                </div>

                {/* <!-- Country --> */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("country")}
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <select
                      id="country"
                      className="input-text"
                      {...register("country")}
                    >
                      <option value="">Choose</option>
                      {countries.map((country) => (
                        <option key={country.text} value={country.text}>
                          {country.text}
                        </option>
                      ))}
                    </select>
                    {/* <!-- Error Text --> */}
                    {errors?.country && (
                      <span className="text-sm text-red-500">
                        {errors?.country?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* <!-- Province --> */}
                {countryWatch === "Indonesia" && (
                  <div>
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t("province")}
                    </label>
                    <div className="mt-1">
                      {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                      <select
                        id="province"
                        className="input-text"
                        {...register("province")}
                      >
                        <option value="">Choose</option>
                        {provinces.map((province) => (
                          <option key={province.id} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      {/* <!-- Error Text --> */}
                      {errors?.province && (
                        <span className="text-sm text-red-500">
                          {errors?.province?.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* <!-- Nature of Business --> */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="nature-of-business"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("business-nature")}
                  </label>
                  <div className="mt-1 grid grid-cols-3 gap-2 py-2">
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        value="Hospital Buildings"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        {...register("business_nature")}
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        {t("hospital-buildings")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        value="Hospital Mechanics"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        {...register("business_nature")}
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        {t("hospital-mechanics")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        value="Hospital Electrics"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        {...register("business_nature")}
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        {t("hospital-electrics")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        value="Hospital Environments"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        {...register("business_nature")}
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        {t("hospital-environments")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        value="Hospital Informatics"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        {...register("business_nature")}
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        {t("hospital-informatics")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        value="Hospital Devices"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        {...register("business_nature")}
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        {t("hospital-devices")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        value="COVID-19 Related Products"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        {...register("business_nature")}
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        {t("covid-19")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        value="Other"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        {...register("business_nature")}
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        {t("other")}
                      </span>
                    </div>
                  </div>
                  {/* <!-- Error Text --> */}
                  {/* <span className="text-sm text-red-500">Input error</span> */}
                </div>
              </div>
            </div>

            {/* <!-- Next button --> */}
            <div className="mt-6">
              {/* <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white transition-all bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setSelectedTab("packages")}
              >
                {t("continue")}
              </button> */}
              <SubmitButton isLoading={isSubmitting} i18nText="register" />
            </div>
          </div>

          {/* // <!-- Packages --> */}
          <div className={`${selectedTab === "packages" ? "block" : "hidden"}`}>
            {/* <div>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t("package")}
                  </span>
                </div>
              </div>
              <div className="min-h-[200px]">
                <div>
                  <label
                    htmlFor="package"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("package")}
                  </label>
                  <div className="mt-1 mb-4">
                    <select
                      id="job"
                      name="job"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    >
                      <option value="">{t("choose")}</option>
                      <option value="Mercury">{t("mercury")}</option>
                      <option value="Mars">{t("mars")}</option>
                      <option value="Venus">{t("venus")}</option>
                      <option value="Uranus">{t("uranus")}</option>
                      <option value="Jupiter">{t("jupiter")}</option>
                      <option value="Custom">{t("custom")}</option>
                    </select>

                    <span className="text-sm text-gray-500">
                      {t("package-help")}{" "}
                      <a
                        className="text-primary hover:text-primary-600 transition underline"
                        href="packages.html"
                      >
                        {t("package")}
                      </a>
                      .
                    </span>
                    <br />
                    <span className="text-sm text-gray-500">
                      {t("package-info")}
                    </span>
                  </div>

                  <div>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        {t("opening.label")}
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="opening"
                          value="Logo on Poster"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("opening.1")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="opening"
                          value="Logo on Zoom Background"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("opening.2")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="opening"
                          value="Ad libs by MC"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("opening.3")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="opening"
                          value="1 Minute Video Ads"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("opening.4")}
                        </span>
                      </div>
                    </fieldset>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        {t("webinar-series.label")}
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="webinar-series"
                          value="Logo on Poster"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("webinar-series.1")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="webinar-series"
                          value="Logo on Zoom Background"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("webinar-series.2")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="webinar-series"
                          value="Ad libs by MC"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("webinar-series.3")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="webinar-series"
                          value="1 Minute Video Ads"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("webinar-series.4")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="webinar-series"
                          value="15 Minutes presentation"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("webinar-series.5")}
                        </span>
                      </div>
                    </fieldset>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        {t("product-exhibition.label")}
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Basic (Website) for 3 days (5 Poster + 1 Minute Video)"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("product-exhibition.1")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Additional 1 Poster"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("product-exhibition.2")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Additional 1 minute video"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("product-exhibition.3")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Product Catalogue (2 MB)"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("product-exhibition.4")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Live Chat"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("product-exhibition.5")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Name Card"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("product-exhibition.6")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Doorprize for visitors"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("product-exhibition.7")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Product exhibition for software house and health apps provider"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("product-exhibition.8")}
                        </span>
                      </div>
                    </fieldset>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        {t("consultation.label")}
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="consultation"
                          value="Basic"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("consultation.1")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="consultation"
                          value="Addional 1 day"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("consultation.2")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="consultation"
                          value="Doorprize for visitors"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("consultation.3")}
                        </span>
                      </div>
                    </fieldset>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        {t("closing.label")}
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Logo on Poster"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("closing.1")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Logo on Zoom Background"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("closing.2")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Ad libs by MC"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("closing.3")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="1 Minute Video Ads"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("closing.4")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Gifts"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("closing.5")}
                        </span>
                      </div>
                    </fieldset>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        {t("website.label")}
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Logo on home page"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("website.1")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Running Text on main page"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("website.2")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="1 News page or display"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("website.3")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="1 Minute Video Ads"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("website.4")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Logo on home page"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("website.5")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Running Text on main page"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("website.6")}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="1 News page or display"
                        />
                        <span className="text-gray-700 text-sm">
                          {t("website.7")}
                        </span>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <!-- Next button --> */}
            {/* <div className="flex space-x-6 mt-6">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-gray-500 transition-all bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setSelectedTab("account-info")}
              >
                &larr; {t("back")}
              </button>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white transition-all bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {t("register")}
              </button>
            </div> */}
          </div>
        </form>

        {/* <!-- Or --> */}
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
                <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>{t("register-as-visitor")}</span>
                </a>
              </Link>
            </div>

            <div>
              <Link href="/login">
                <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>{t("login")}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default RegisterExhibitor;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "auth"])),
  },
});
