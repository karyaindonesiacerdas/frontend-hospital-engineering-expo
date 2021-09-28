/* eslint-disable react/display-name */
import { useState, useEffect, useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Switch } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { parseCookies } from "nookies";
import { useQueryClient } from "react-query";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader, SubmitButton } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { RundownDetail, useRundowns } from "hooks/useRundowns";
import { AddRundown } from "@/components/rundown/AddRundown";
import { EditRundown } from "@/components/rundown/EditRundown";
import { DeleteRundown } from "@/components/rundown/DeleteRundown";
import { useSettings } from "hooks/useSettings";

const tabs = [
  { name: "Exhibitor", href: "/admin/exhibitor", current: false },
  { name: "Visitor", href: "/admin/visitor", current: false },
  { name: "Webinar", href: "/admin/webinar", current: false },
  { name: "Consultation", href: "/admin/consultation", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Inputs = {
  youtube_link: string;
  zoom_link: string;
  zoom_business_link: string;
  ads1_link: string;
  ads2_link: string;
  webinar_link: string;
};

const AdminPage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openAddRundownModal, setOpenAddRundownModal] = useState(false);
  const [openEditRundownModal, setOpenEditRundownModal] = useState(false);
  const [openDeleteRundownModal, setOpenDeleteRundownModal] = useState(false);
  const [selectedRundown, setSelectedRundown] = useState<RundownDetail>();
  const [enabledChat, setEnabledChat] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<Inputs>();
  const cookies = parseCookies();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isLoading && user?.role !== "admin") {
      router.push("/main-hall");
    }
  }, [router, user, isLoading]);

  const { data: settings } = useSettings();

  useEffect(() => {
    reset({
      youtube_link: settings?.youtube_link,
      ads1_link: settings?.ads1_link,
      ads2_link: settings?.ads2_link,
      zoom_business_link: settings?.zoom_business_link,
      zoom_link: settings?.zoom_link,
      webinar_link: settings?.webinar_link,
    });
    setEnabledChat(settings?.is_chat.toString() === "1" ? true : false);
  }, [settings, reset]);

  if (isLoading || !isAuthenticated) {
    return <FullPageLoader />;
  }

  if (user?.role !== "admin") return null;

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const {
      ads1_link,
      ads2_link,
      youtube_link,
      zoom_business_link,
      zoom_link,
      webinar_link,
    } = values;

    // console.log({ values });

    const data = {
      _method: "PUT",
      youtube_link,
      zoom_business_link,
      zoom_link,
      ads1_link,
      ads2_link,
      webinar_link,
      is_chat: enabledChat ? 1 : 0,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      await res.json();
      await queryClient.invalidateQueries(["settings"]);
      toast.success("App settings updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Error");
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
      <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
        {/* ### Modals ### */}
        <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
        {user.email === "admin@mail.com" && (
          <>
            <AddRundown
              open={openAddRundownModal}
              setOpen={setOpenAddRundownModal}
            />
            {selectedRundown && (
              <>
                <EditRundown
                  open={openEditRundownModal}
                  setOpen={setOpenEditRundownModal}
                  selectedRundown={selectedRundown}
                  setSelectedRundown={setSelectedRundown}
                />
                <DeleteRundown
                  open={openDeleteRundownModal}
                  setOpen={setOpenDeleteRundownModal}
                  selectedRundown={selectedRundown}
                />
              </>
            )}
          </>
        )}

        <div className="px-2 xl:px-0 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="pl-0 lg:pl-1 text-xl text-gray-700 font-bold text-center uppercase tracking-wide">
              Admin Page
            </h2>
          </div>

          <div className="bg-white p-2 shadow rounded-md mb-6">
            <nav className="-mb-px flex" aria-label="Tabs">
              {tabs.map((tab) => (
                <Link key={tab.name} href={tab.href}>
                  <a
                    className={classNames(
                      tab.current
                        ? " text-white bg-primary-600"
                        : " text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "w-1/4 py-4 px-1 text-center font-medium text-lg rounded-md"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>

          <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-md">
            <h2 className="text-2xl font-semibold text-center mb-6">
              App Settings
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="youtube-link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Youtube Live Link
                </label>
                <div className="mt-1">
                  <input
                    id="youtube-link"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    {...register("youtube_link")}
                  />
                  {errors?.youtube_link && (
                    <span className="text-sm text-red-500">
                      {errors?.youtube_link?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="zoom-webinar-link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zoom Webinar Link
                </label>
                <div className="mt-1">
                  <input
                    id="zoom-webinar-link"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    {...register("zoom_link")}
                  />
                  {errors?.zoom_link && (
                    <span className="text-sm text-red-500">
                      {errors?.zoom_link?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="zoom-business-matching-link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zoom Business Matching Link
                </label>
                <div className="mt-1">
                  <input
                    id="zoom-business-matching-link"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    {...register("zoom_business_link")}
                  />
                  {errors?.zoom_business_link && (
                    <span className="text-sm text-red-500">
                      {errors?.zoom_business_link?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="main-video"
                  className="block text-sm font-medium text-gray-700"
                >
                  Main Video (Youtube Link)
                </label>
                <div className="mt-1">
                  <input
                    id="main-video"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    {...register("webinar_link")}
                  />
                  {errors?.webinar_link && (
                    <span className="text-sm text-red-500">
                      {errors?.webinar_link?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="advertisement-1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Advertisement 1 (Youtube link)
                </label>
                <div className="mt-1">
                  <input
                    id="advertisement-1"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    {...register("ads1_link")}
                  />
                  {errors?.ads1_link && (
                    <span className="text-sm text-red-500">
                      {errors?.ads1_link?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="advertisement-2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Advertisement 2 (Youtube link)
                </label>
                <div className="mt-1">
                  <input
                    id="advertisement-2"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    {...register("ads2_link")}
                  />
                  {errors?.ads2_link && (
                    <span className="text-sm text-red-500">
                      {errors?.ads2_link?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="ve-chat"
                  className="block text-sm font-medium text-gray-700"
                >
                  VE Chat
                </label>
                <div className="mt-1">
                  <Switch
                    checked={enabledChat}
                    onChange={setEnabledChat}
                    className={`${
                      enabledChat ? "bg-primary-600" : "bg-gray-200"
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    <span className="sr-only">VE Chat</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        enabledChat ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    />
                  </Switch>
                </div>
              </div>
              <SubmitButton isLoading={isSubmitting}>Save</SubmitButton>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
