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
  institution_name: string;
  institution_type: string;
  country: string;
  province: string;
  visitor_type: string;
  product_interest: string[];
  visit_purpose: string[];
  member_sehat_ri: string;
  allow_share_info: string;
  accept_condition: boolean;
  // role: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  mobile: yup.string().required("Mobile / Whatsapp is required"),
  name: yup.string().required("Name is required"),
  job_function: yup.string().required("Job function is required"),
  password: yup.string().required("Password is required"),
  password_confirmation: yup
    .string()
    .required("Password confirmation is required"),
  institution_name: yup.string().required("Institution name is required"),
  institution_type: yup.string().required("Insitution type is required"),
  country: yup.string().required("Country is required"),
  visitor_type: yup.string().required("Visitor type is required"),
  member_sehat_ri: yup.string().required("Select one"),
});

const RegisterVisitor: NextPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("auth");
  const { registerVisitor, isAuthenticated, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const cookies = parseCookies();

  useEffect(() => {
    if (!isLoading && isAuthenticated && cookies.access_token && cookies.user) {
      router.push("/main-hall");
    }
  }, [isAuthenticated, isLoading, router, cookies.access_token, cookies.user]);

  console.log({ errors });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const {
      email,
      mobile,
      name,
      job_function,
      password,
      password_confirmation,
      institution_name,
      institution_type,
      country,
      province,
      visitor_type,
      product_interest,
      visit_purpose,
      member_sehat_ri,
      allow_share_info,
    } = values;
    try {
      await registerVisitor({
        email,
        allow_share_info: allow_share_info === "Yes" ? true : false,
        country,
        institution_name,
        institution_type,
        job_function,
        member_sehat_ri,
        mobile,
        name,
        password,
        password_confirmation,
        product_interest,
        province,
        visit_purpose,
        visitor_type,
        role: "visitor",
      });
      toast.success("Successful Registration");
      await router.push("/main-hall");
    } catch (error) {
      toast.error("Registration Failed");
      // console.log({ error });
    }
  };

  return (
    <AuthPageLayout>
      <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
        <div className="flex flex-col items-center space-y-0.5 mb-10">
          <a
            href="index.html"
            className="mb-1 flex flex-col items-center space-y-1"
          >
            <Image
              width={40}
              height={40}
              className="object-contain w-12 h-12"
              src="/ptpi.png"
              alt="logo ptpi"
            />
            <span className="text-2xl font-bold text-primary">HEF 2021</span>
          </a>
          <h2 className="text-3xl text-gray-800 font-bold">
            {t("register-as-visitor")}
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <!-- 2 column grid for from input --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-6">
            {/* <!-- Email --> */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
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
                className="block text-sm font-medium text-gray-700"
              >
                {t("job-visitor.label")}
              </label>
              <div className="mt-1">
                {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                <select
                  id="job"
                  className="input-text"
                  {...register("job_function")}
                >
                  <option value="">Choose</option>
                  <option value="Architect">Architect</option>
                  <option value="Director">Director</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Manager">Manager</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Programmer">Programmer</option>
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

            {/* <!-- Institution Name --> */}
            <div>
              <label
                htmlFor="institution-name"
                className="block text-sm font-medium text-gray-700"
              >
                {t("institution-name")}
              </label>
              <div className="mt-1">
                {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                <input
                  id="institution-name"
                  className="input-text"
                  {...register("institution_name")}
                />
                {/* <!-- Error Text --> */}
                {errors?.institution_name && (
                  <span className="text-sm text-red-500">
                    {errors?.institution_name?.message}
                  </span>
                )}
              </div>
            </div>

            {/* <!-- Type of Institution --> */}
            <div>
              <label
                htmlFor="type-of-institution"
                className="block text-sm font-medium text-gray-700"
              >
                {t("institution-type.label")}
              </label>
              <div className="mt-1">
                {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                <select
                  id="type-of-institution"
                  className="input-text"
                  {...register("institution_type")}
                >
                  <option value="">Choose</option>
                  <option value="Comunity Health Services">
                    Comunity Health Services
                  </option>
                  <option value="Consultancy Services">
                    Consultancy Services
                  </option>
                  <option value="Contractor (Hospital)">
                    Contractor (Hospital)
                  </option>
                  <option value="Dealers & Distributors">
                    Dealers & Distributors
                  </option>
                  <option value="Educational Institute (Medical)">
                    Educational Institute (Medical)
                  </option>
                  <option value="Educational Institute (Non-Medical)">
                    Educational Institute (Non-Medical)
                  </option>
                  <option value="Government (Ministry of Health)">
                    Government (Ministry of Health)
                  </option>
                  <option value="Hospital (Private)">Hospital (Private)</option>
                  <option value="Hospital (Public)">Hospital (Public)</option>
                  <option value="Import & Export (Healthcare)">
                    Import & Export (Healthcare)
                  </option>
                  <option value="Information Technology/ Software (Healthcare)">
                    Information Technology/ Software (Healthcare)
                  </option>
                  <option value="Investor (Healthcare)">
                    Investor (Healthcare)
                  </option>
                  <option value="Laboratories (Medical)">
                    Laboratories (Medical)
                  </option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Manufacturer (Medical)">
                    Manufacturer (Medical)
                  </option>
                  <option value="Medical Practice">Medical Practice</option>
                  <option value="Medical Travel">Medical Travel</option>
                  <option value="Technology (Medical)">
                    Technology (Medical)
                  </option>
                  <option value="Other">Other</option>
                </select>
                {/* <!-- Error Text --> */}
                {errors?.institution_type && (
                  <span className="text-sm text-red-500">
                    {errors?.institution_type?.message}
                  </span>
                )}
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

            {/* <!-- Visitor Type --> */}
            <div>
              <label
                htmlFor="visitor-type"
                className="block text-sm font-medium text-gray-700"
              >
                {t("visitor-type.label")}
              </label>
              <div className="mt-1">
                {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                <select
                  id="visitor-type"
                  className="input-text"
                  {...register("visitor_type")}
                >
                  <option value="">Choose</option>
                  <option value="Hospital Management Staff">
                    Hospital Management Staff
                  </option>
                  <option value="Hospital Clinical Staff">
                    Hospital Clinical Staff
                  </option>
                  <option value="Hospital Engineering Staff">
                    Hospital Engineering Staff
                  </option>
                  <option value="Biomedical Engineering">
                    Biomedical Engineering
                  </option>
                  <option value="Medical Doctor">Medical Doctor</option>
                  <option value="Government Staff">Government Staff</option>
                  <option value="University Lecturer">
                    University Lecturer
                  </option>
                </select>
                {/* <!-- Error Text --> */}
                {errors?.visitor_type && (
                  <span className="text-sm text-red-500">
                    {errors?.visitor_type?.message}
                  </span>
                )}
              </div>
            </div>

            {/* <!-- Which product are you interested in? --> */}
            <div className="md:col-span-2">
              <label
                htmlFor="product-interest"
                className="block text-sm font-medium text-gray-700"
              >
                {t("product-interest")}
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2 py-2">
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Hospital Building"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("product_interest")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Building
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Hospital Mechanic"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("product_interest")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Mechanic
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Hospital Electric"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("product_interest")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Electric
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Hospital Environment"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("product_interest")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Environment
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Hospital Informatics"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("product_interest")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Informatics
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Hospital Devices"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("product_interest")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Devices
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="COVID-19 Related Products"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("product_interest")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    COVID-19 Related Products
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Other"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("product_interest")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Other
                  </span>
                </div>
              </div>
              {/* <!-- Error Text --> */}
              {/* {errors?.product_interest && (
                <span className="text-sm text-red-500">
                  {errors?.product_interest?.message}
                </span>
              )} */}
            </div>

            {/* <!-- Purpose of Visiting --> */}
            <div className="md:col-span-2">
              <label
                htmlFor="purpose-of-visiting"
                className="block text-sm font-medium text-gray-700"
              >
                {t("purpose-visit.label")}
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2 py-2">
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Buying"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("visit_purpose")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    {t("purpose-visit.buying")}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Networking"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("visit_purpose")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    {t("purpose-visit.networking")}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Information Gathering"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("visit_purpose")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    {t("purpose-visit.information-gathering")}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Join Webinar"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("visit_purpose")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    {t("purpose-visit.join-webinar")}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Consultaion"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("visit_purpose")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    {t("purpose-visit.consultation")}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value="Other"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("visit_purpose")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    {t("purpose-visit.other")}
                  </span>
                </div>
              </div>
              {/* <!-- Error Text --> */}
              {/* {errors?.visit_purpose && <span className="text-sm text-red-500">{}</span>} */}
            </div>

            {/* <!-- Have registered in SEHAT-RI --> */}
            <div className="md:col-span-2">
              <label
                htmlFor="have-registered-sehat-ri"
                className="block text-sm font-medium text-gray-700"
              >
                {t("sehat-ri.label")}
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2 py-2">
                <div className="flex items-center text-sm">
                  <input
                    type="radio"
                    value="Yes"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("member_sehat_ri")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    {t("sehat-ri.yes")}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="radio"
                    value="No"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("member_sehat_ri")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    {t("sehat-ri.no")}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="radio"
                    value="I Forget"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("member_sehat_ri")}
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    {t("sehat-ri.forget")}
                  </span>
                </div>
              </div>
              {/* <!-- Error Text --> */}
              {errors?.member_sehat_ri && (
                <span className="text-sm text-red-500">
                  {errors?.member_sehat_ri?.message}
                </span>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="mb-1 text-sm text-gray-700">
                {t("sehat-ri.term")}
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  {...register("accept_condition")}
                />{" "}
                <span className="text-sm text-gray-700">
                  {t("sehat-ri.accept")}
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="mb-1 text-sm text-gray-700">
                {t("share-info")}
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <input
                    id="Yes"
                    type="radio"
                    value="Yes"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    // defaultChecked={true}
                    {...register("allow_share_info")}
                  />{" "}
                  <label htmlFor="yes" className="text-sm text-gray-700">
                    {t("sehat-ri.yes")}
                  </label>
                </div>
                <div>
                  <input
                    id="No"
                    type="radio"
                    value="No"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    {...register("allow_share_info")}
                  />{" "}
                  <label htmlFor="no" className="text-sm text-gray-700">
                    {t("sehat-ri.no")}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SubmitButton isLoading={isSubmitting} i18nText="register" />
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
              <Link href="/register/exhibitor">
                <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>{t("register-as-exhibitor")}</span>
                </a>
              </Link>
            </div>

            <div>
              <Link href="/login">
                <a
                  href="login.html"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
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

export default RegisterVisitor;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "auth"])),
  },
});
