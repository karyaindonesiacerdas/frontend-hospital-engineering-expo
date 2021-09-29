import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

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
import { BackButton } from "@/components/BackButton";
import { useSettings } from "hooks/useSettings";

const tabs = [
  { name: "Exhibitor", href: "/admin/exhibitor", current: false },
  { name: "Visitor", href: "/admin/visitor", current: false },
  { name: "Webinar", href: "/admin/webinar", current: true },
  { name: "Consultation", href: "/admin/consultation", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const AdminWebinarPage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openAddRundownModal, setOpenAddRundownModal] = useState(false);
  const [openEditRundownModal, setOpenEditRundownModal] = useState(false);
  const [openDeleteRundownModal, setOpenDeleteRundownModal] = useState(false);
  const [selectedRundown, setSelectedRundown] = useState<RundownDetail>();

  const { data: rundowns, isLoading: isLoadingRundowns } = useRundowns();

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

  if (isLoading || !isAuthenticated || isLoadingRundowns) {
    return <FullPageLoader />;
  }

  if (user?.role !== "admin") return null;

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
            <h2 className="pl-0 lg:pl-1 text-xl text-gray-700 font-bold text-center lg:text-left uppercase tracking-wide">
              Admin Page - Webinar
            </h2>
          </div>

          <div className="bg-white p-2 shadow rounded-md mb-2">
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

          <div className="mb-4">
            <BackButton href="/admin" text="Admin" />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="flex space-x-3 items-center">
              {user.email === "admin@mail.com" && (
                <button
                  onClick={() => setOpenAddRundownModal(true)}
                  className="py-2 px-4 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700"
                >
                  Add Rundown
                </button>
              )}
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
          <div className="flex flex-col">
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
                      {rundowns?.map((rundown) => (
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
                          <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
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
                          {user.role === "admin" && (
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              <div className="flex space-x-4">
                                <button
                                  onClick={() => {
                                    setSelectedRundown(rundown);
                                    setOpenEditRundownModal(true);
                                  }}
                                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedRundown(rundown);
                                    setOpenDeleteRundownModal(true);
                                  }}
                                  className="text-sm font-medium text-red-600 hover:text-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
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
    </div>
  );
};

export default AdminWebinarPage;
