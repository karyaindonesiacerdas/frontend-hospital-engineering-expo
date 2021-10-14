import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader, SubmitButton } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { provinces } from "@/data/provinces";
import { countries } from "@/data/countries";
// import { useExhibitor } from "hooks/useExhibitor";
import { UploadLogo } from "@/components/settings/UploadLogo";
import { useUser } from "hooks/useUser";
import { ListViewers } from "@/components/settings/ListViewers";
import { useViews } from "hooks/useViews";
import { useSettings } from "hooks/useSettings";
import { SocketProvider } from "socket/socket.context";

type Inputs = {
  name: string;
  email: string;
  website: string;
  phone: string;
  country: string;
  province: string;
};

const SettingVirtualBoothPage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();
  const cookies = parseCookies();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
    if (!isLoading && user?.role !== "exhibitor") {
      router.push("/main-hall");
    }
  }, [isAuthenticated, isLoading, router, user?.role]);

  const { data: dataUser, isLoading: isLoadingUser } = useUser();
  const { data: settings } = useSettings();
  const { data } = useViews({ page: 1 });

  useEffect(() => {
    if (dataUser) {
      reset({
        name: dataUser?.company_name,
        website: dataUser?.company_website,
        country: dataUser?.country,
        province: dataUser?.province,
        email: dataUser?.email,
        phone: dataUser?.mobile,
      });
    }
  }, [dataUser, reset]);

  if (isLoading || !isAuthenticated || isLoadingUser) {
    return <FullPageLoader />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const { country, email, name, phone, province, website } = values;

      const data = {
        _method: "PUT",
        email,
        company_name: name,
        mobile: phone,
        company_website: website,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookies?.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Error upload company logo");
      }

      await res.json();
      await queryClient.invalidateQueries(["exhibitor", user?.id]);

      toast.success("Company Profile uploaded successfully!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Company profile failed to upload!", {
        position: "top-right",
      });
    }
  };

  // console.log({ user });

  return (
    <SocketProvider>
      <div className="bg-gray-100 min-h-screen">
        {/* Chat Button */}
        {settings?.is_chat === "1" &&
          (user?.role !== "exhibitor" ||
            user?.id === 2 ||
            user?.ala_carte?.includes("chat") ||
            [3, 4, 5].includes(dataUser?.package_id)) && (
            <div
              className="fixed right-4 lg:right-6 bottom-4 lg:bottom-6 z-10"
              style={{ backdropFilter: "4px" }}
            >
              <ChatButton onClick={() => setOpenChatModal(true)} />
            </div>
          )}

        <Navbar variant="dark" currentHref="webinar-schedule" />

        {/* Main Content */}
        <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
          {/* ### Modals ### */}
          {settings?.is_chat === "1" &&
            (user?.role !== "exhibitor" ||
              user?.id === 2 ||
              user?.ala_carte?.includes("chat") ||
              [3, 4, 5].includes(dataUser?.package_id)) && (
              <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
            )}

          {/* Form */}
          {/* Personal Info */}
          <div className="px-2 sm:px-8 mt-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Exhibitor Settings
            </h2>
          </div>

          {/* Company Info */}
          <div className="mt-10 sm:mt-0 py-6 px-2 sm:px-8">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Company Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="company-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="company-name"
                            className="input-text"
                            placeholder="Company Name"
                            {...register("name")}
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="company-email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="company-email"
                            className="input-text"
                            placeholder="Company Email"
                            {...register("email")}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Website
                          </label>
                          <input
                            type="text"
                            id="company-website"
                            className="input-text"
                            placeholder="Company Website"
                            {...register("website")}
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="company-phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Phone
                          </label>
                          <input
                            id="company-phone"
                            className="input-text"
                            placeholder="Company Phone"
                            {...register("phone")}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Country
                          </label>
                          <div className="mt-1">
                            <select
                              id="country"
                              className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                              {...register("country")}
                            >
                              <option value="">Choose</option>
                              {countries.map((country) => (
                                <option key={country.text} value={country.text}>
                                  {country.text}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="province"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Province
                          </label>
                          <div className="mt-1">
                            <select
                              id="province"
                              className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                              {...register("province")}
                            >
                              <option value="">Choose</option>
                              {provinces.map((province) => (
                                <option key={province.id} value={province.name}>
                                  {province.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <div className="flex justify-end">
                        <SubmitButton
                          isLoading={isSubmitting}
                          fullWidth={false}
                          className="bg-primary-600 hover:bg-primary-700"
                        >
                          Save
                        </SubmitButton>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          {/* Upload Logo */}
          <div className="mt-10 sm:mt-0 py-6 px-2 sm:px-8">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Company Logo
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p> */}
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-3 gap-6">
                  <div className="aspect-w-3 aspect-h-2 max-w-[200px]">
                    <Image
                      // width={400}
                      // height={300}
                      // objectFit="contain"
                      layout="fill"
                      objectFit="contain"
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/companies/${dataUser?.company_logo}`}
                      alt="Company Logo"
                    />
                  </div>
                  <div className="col-span-2">
                    <UploadLogo />
                  </div>
                </div>
                {/* Upload Logo */}
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="py-6 px-8">
            <h3 className="text-2xl font-semibold mb-6">
              Booth Viewers ({data?.total} Viewers)
            </h3>
            <div className="pb-20">
              <ListViewers />
            </div>
          </div>
          {/* <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0 py-6 px-2 sm:px-8">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Virtual Booth
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Company Name Card
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="company-name-card"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="company-name-card"
                                  name="company-name-card"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Catalog
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="catalog"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="catalog"
                                  name="catalog"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>

                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Poster 1
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="poster-1"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="poster-1"
                                  name="poster-1"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="display-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display-name"
                            className="input-text"
                            placeholder="Display Name"
                            defaultValue="Poster 1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Poster 2
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="poster-2"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="poster-2"
                                  name="poster-2"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="display-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display-name"
                            className="input-text"
                            placeholder="Display Name"
                            defaultValue="Poster 1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Poster 3
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="poster-3"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="poster-3"
                                  name="poster-3"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="display-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display-name"
                            className="input-text"
                            placeholder="Display Name"
                            defaultValue="Poster 1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Poster 4
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="poster-4"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="poster-4"
                                  name="poster-4"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="display-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display-name"
                            className="input-text"
                            placeholder="Display Name"
                            defaultValue="Poster 1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Poster 5
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="poster-5"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="poster-5"
                                  name="poster-5"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="display-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display-name"
                            className="input-text"
                            placeholder="Display Name"
                            defaultValue="Poster 1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Poster 6
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="poster-6"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="poster-6"
                                  name="poster-6"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="display-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display-name"
                            className="input-text"
                            placeholder="Display Name"
                            defaultValue="Poster 1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Poster 7
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="poster-7"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="poster-7"
                                  name="poster-7"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="display-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display-name"
                            className="input-text"
                            placeholder="Display Name"
                            defaultValue="Poster 1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Poster 8
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="poster-8"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="poster-8"
                                  name="poster-8"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="display-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display-name"
                            className="input-text"
                            placeholder="Display Name"
                            defaultValue="Poster 1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Poster 9
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="poster-9"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="poster-9"
                                  name="poster-9"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="display-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display-name"
                            className="input-text"
                            placeholder="Display Name"
                            defaultValue="Poster 1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                      <form className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Poster 10
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="poster-10"
                                className="dropzone-label"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="poster-10"
                                  name="poster-10"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 1MB
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="display-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display-name"
                            className="input-text"
                            placeholder="Display Name"
                            defaultValue="Poster 1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="mt-2 btn-primary">
                            Upload
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div> */}
        </main>
      </div>
    </SocketProvider>
  );
};

export default SettingVirtualBoothPage;
