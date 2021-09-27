/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader, SubmitButton } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { useExhibitor } from "hooks/useExhibitor";
import { XIcon } from "@heroicons/react/solid";
import { useUser } from "hooks/useUser";

type Inputs = {
  email: string;
  mobile: string;
  name: string;
  job_function: string;
  img_profile: any;
  // photo: string;
};

const MyAccountPage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: user?.name,
      mobile: user?.mobile,
      email: user?.email,
      job_function: user?.job_function,
    },
  });
  const cookies = parseCookies();
  const queryClient = useQueryClient();
  const imgProfileWatch = watch("img_profile");

  const previewURL =
    imgProfileWatch &&
    imgProfileWatch[0] &&
    URL.createObjectURL(imgProfileWatch[0]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const { data, isLoading: isLoadingUser } = useUser();

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        mobile: data?.mobile,
        email: data?.email,
        job_function: data?.job_function,
      });
    }
  }, [data, reset]);

  // console.log({ data });

  if (isLoading || !isAuthenticated || isLoadingUser) {
    return <FullPageLoader />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const { email, job_function, mobile, name, img_profile } = values;

      const data = new FormData();
      img_profile && data.append("img_profile", img_profile[0]);
      data.append("_method", "PUT");
      data.append("email", email);
      data.append("name", name);
      data.append("job_function", job_function);
      data.append("mobile", mobile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookies?.access_token}`,
          },
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Error upload account profile");
      }

      await res.json();
      if (user?.role === "exhibitor") {
        await queryClient.invalidateQueries(["exhibitor", user?.id]);
      }
      await queryClient.invalidateQueries(["user"]);

      toast.success("Account Profile uploaded successfully!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Account profile failed to upload!", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Chat Button */}
      <div
        className="fixed right-4 lg:right-6 bottom-4 lg:bottom-6 z-10"
        style={{ backdropFilter: "4px" }}
      >
        <ChatButton onClick={() => setOpenChatModal(true)} />
      </div>

      <Navbar variant="dark" currentHref="webinar-schedule" />

      {/* Main Content */}
      <main className="px-1.5 lg:px-2 pb-10 max-w-7xl mx-auto">
        {/* ### Modals ### */}
        <ChatModal open={openChatModal} setOpen={setOpenChatModal} />

        {/* Form */}
        {/* Personal Info */}
        <div className="px-2 sm:px-8 mt-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">My Account</h2>
        </div>
        <div className="px-2 sm:px-8 py-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          id="email-address"
                          autoComplete="email"
                          className="input-text"
                          {...register("email")}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mobile (WhatsApp)
                        </label>
                        <input
                          type="text"
                          id="mobile"
                          autoComplete="email"
                          className="input-text"
                          {...register("mobile")}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="full-name"
                          autoComplete="given-name"
                          className="input-text"
                          {...register("name")}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Job Function
                        </label>
                        <select
                          id="job"
                          className="input-text"
                          {...register("job_function")}
                        >
                          <option value="">Choose</option>
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
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          {previewURL ? (
                            <img
                              src={previewURL}
                              alt="preview image"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : data?.img_profile ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/profiles/${data?.img_profile}`}
                              alt="Image Profile"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                          )}
                          {/* <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            {previewURL ? (
                              <img src={previewURL} alt="preview image" />
                            ) : data?.img_profile ? (
                              <img
                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/profiles/${data?.img_profile}`}
                                alt="Image Profile"
                              />
                            ) : (
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )}
                          </span> */}
                          {previewURL && (
                            <button
                              className="ml-3 p-1 bg-red-50 text-red-900 hover:bg-red-500 hover:text-white"
                              onClick={() => setValue("img_profile", undefined)}
                            >
                              <span className="sr-only">Clear Image</span>
                              <XIcon className="w-4 h-4" />
                            </button>
                          )}
                          <label
                            // type="button"
                            htmlFor="img_profile"
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Change
                          </label>
                          <input
                            id="img_profile"
                            type="file"
                            className="hidden"
                            {...register("img_profile")}
                          />
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

        {/* Change Password */}
        <div className="px-2 sm:px-8 py-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Change Password
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="current-password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Current Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="current-password"
                            name="current-password"
                            type={showPassword ? "text" : "password"}
                            className="input-password"
                            autoComplete="new-password"
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

                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="new-password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="new-password"
                            name="new-password"
                            type={showPassword ? "text" : "password"}
                            className="input-password"
                            autoComplete="new-password"
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
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" className="btn-primary">
                      Change
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountPage;
