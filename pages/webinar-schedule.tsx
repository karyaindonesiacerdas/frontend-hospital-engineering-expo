import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { RundownDetail, useRundowns } from "hooks/useRundowns";
import { formatDate } from "utils";
import { AddRundown } from "@/components/rundown/AddRundown";
import { EditRundown } from "@/components/rundown/EditRundown";
import { DeleteRundown } from "@/components/rundown/DeleteRundown";
import { useSettings } from "hooks/useSettings";
import { useUser } from "hooks/useUser";
import { SocketProvider } from "socket/socket.context";

const WebinarSchedule: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openAddRundownModal, setOpenAddRundownModal] = useState(false);
  const [openEditRundownModal, setOpenEditRundownModal] = useState(false);
  const [openDeleteRundownModal, setOpenDeleteRundownModal] = useState(false);
  const [selectedRundown, setSelectedRundown] = useState<RundownDetail>();
  const { data: dataUser } = useUser();

  const { data: rundowns, isLoading: isLoadingRundowns } = useRundowns();

  // =================================
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_WEB_STATUS === "maintenance") {
      router.push("/maintenance");
    }
  }, [router]);
  // =================================

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);
  const { data: settings } = useSettings();

  if (isLoading || !isAuthenticated || isLoadingRundowns) {
    return <FullPageLoader />;
  }

  return (
    <SocketProvider>
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
            <h2 className="pl-0 lg:pl-1 text-xl text-gray-700 font-bold text-center lg:text-left uppercase tracking-wide">
              Live Stage Schedule
            </h2>
            <div className="flex space-x-3 items-center">
              {/* {user.email === "admin@mail.com" && (
                <button
                  onClick={() => setOpenAddRundownModal(true)}
                  className="py-2 px-4 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700"
                >
                  Add Rundown
                </button>
              )} */}
              <a
                href={settings?.zoom_link}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2 inline-flex leading-5 font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition text-white"
              >
                Join Zoom
              </a>
            </div>
          </div>
          {/* Table */}
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Day 2</h3>
          <div className="flex flex-col mb-10">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:block px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Speaker
                        </th>
                        <th
                          scope="col"
                          className="relative px-3 sm:px-6 py-3"
                        ></th>
                        <th
                          scope="col"
                          className="relative px-3 sm:px-6 py-3"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rundowns
                        ?.filter((rundown) => rundown.date === "2021-10-16")
                        ?.map((rundown) => (
                          <tr key={rundown.id}>
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {rundown.date &&
                                  formatDate(new Date(rundown.date))}
                              </div>
                            </td>
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {rundown.time}
                              </div>
                            </td>
                            <td className="hidden sm:table-cell px-4 py-2  sm:px-6 sm:py-4 whitespace-wrap">
                              <div className="text-sm font-medium text-gray-900">
                                {rundown.title}
                              </div>
                              <div className="text-sm font-medium text-gray-500">
                                {rundown.subtitle}
                              </div>
                            </td>
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-wrap">
                              <div className="text-sm font-medium text-gray-900">
                                {rundown.speakers}
                              </div>
                              <div className="text-sm font-medium text-gray-500">
                                {rundown.position}
                              </div>
                            </td>
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              {rundown.status === 3 ? (
                                <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-800 uppercase">
                                  Done
                                </span>
                              ) : rundown.status === 2 ? (
                                <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md bg-yellow-100 text-yellow-800 uppercase animate-pulse">
                                  Now Showing
                                </span>
                              ) : rundown.status === 1 ? (
                                <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-100 text-gray-800 uppercase">
                                  Upcoming
                                </span>
                              ) : null}
                            </td>
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              {rundown.embedd_link ? (
                                <a
                                  href={rundown.embedd_link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block text-sm mb-2 text-[#ff0000] font-semibold hover:underline cursor-pointer"
                                >
                                  Watch
                                </a>
                              ) : null}
                              {rundown.attachment_link ? (
                                <a
                                  href={rundown.attachment_link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block text-sm text-primary-600 font-semibold hover:underline cursor-pointer"
                                >
                                  Materials
                                </a>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Day 1</h3>
          <div className="flex flex-col mb-10">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:block px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Speaker
                        </th>
                        <th
                          scope="col"
                          className="relative px-3 sm:px-6 py-3"
                        ></th>
                        <th
                          scope="col"
                          className="relative px-3 sm:px-6 py-3"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rundowns
                        ?.filter((rundown) => rundown.date === "2021-10-02")
                        ?.map((rundown) => (
                          <tr key={rundown.id}>
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {rundown.date &&
                                  formatDate(new Date(rundown.date))}
                              </div>
                            </td>
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {rundown.time}
                              </div>
                            </td>
                            <td className="hidden sm:table-cell px-4 py-2  sm:px-6 sm:py-4 whitespace-wrap">
                              <div className="text-sm font-medium text-gray-900">
                                {rundown.title}
                              </div>
                              <div className="text-sm font-medium text-gray-500">
                                {rundown.subtitle}
                              </div>
                            </td>
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-wrap">
                              <div className="text-sm font-medium text-gray-900">
                                {rundown.speakers}
                              </div>
                              <div className="text-sm font-medium text-gray-500">
                                {rundown.position}
                              </div>
                            </td>
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              {rundown.status === 3 ? (
                                <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-800 uppercase">
                                  Done
                                </span>
                              ) : rundown.status === 2 ? (
                                <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md bg-yellow-100 text-yellow-800 uppercase animate-pulse">
                                  Now Showing
                                </span>
                              ) : rundown.status === 1 ? (
                                <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-100 text-gray-800 uppercase">
                                  Upcoming
                                </span>
                              ) : null}
                            </td>
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              {rundown.embedd_link ? (
                                <a
                                  href={rundown.embedd_link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block text-sm mb-2 text-[#ff0000] font-semibold hover:underline cursor-pointer"
                                >
                                  Watch
                                </a>
                              ) : null}
                              {rundown.attachment_link ? (
                                <a
                                  href={rundown.attachment_link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block text-sm text-primary-600 font-semibold hover:underline cursor-pointer"
                                >
                                  Materials
                                </a>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SocketProvider>
  );
};

export default WebinarSchedule;
