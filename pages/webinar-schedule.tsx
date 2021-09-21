import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";

const schedules = [
  {
    day: "Day 1",
    date: "2 October 2021",
    time: "08.00 - 08.10",
    title: "Welcome Speech",
    subtitle: "",
    speaker: "IAHE President",
    status: "done",
  },
  {
    day: "Day 1",
    date: "2 October 2021",
    time: "08.10 - 08.30",
    title: "Keynote Speech I",
    subtitle: "",
    speaker: "Ministry of Health Representative",
    status: "done",
  },
  {
    day: "Day 1",
    date: "2 October 2021",
    time: "08.30 - 08.50",
    title: "Keynote Speech II",
    subtitle: "",
    speaker: "IFHE Representative",
    status: "now-showing",
  },
  {
    day: "Day 1",
    date: "2 October 2021",
    time: "09.00 - 09.30",
    title: "Hospital Building I Expert Talk",
    subtitle: "Master Plan and Hospital Building Regulations",
    speaker: "Ministry of PUblic Works and Housing Representative",
    status: "upcoming",
  },
];

const WebinarSchedule: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <FullPageLoader />;
  }

  return (
    <>
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

        <div className="px-2 xl:px-0 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="pl-0 lg:pl-1 text-xl text-gray-700 font-bold text-center lg:text-left uppercase tracking-wide">
              Live Stage Schedule
            </h2>
            <a
              href="https://zoom.us"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2 inline-flex leading-5 font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition text-white"
            >
              Join Zoom
            </a>
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
                          Day
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
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {schedules.map((schedule) => (
                        <tr key={schedule.title}>
                          <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {schedule.day}
                            </div>
                          </td>
                          <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {schedule.date}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                              {schedule.time}
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {schedule.title}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                              {schedule.subtitle}
                            </div>
                          </td>
                          <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {schedule.speaker}
                            </div>
                          </td>
                          <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                            {schedule.status === "done" ? (
                              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-800 uppercase">
                                {schedule.status}
                              </span>
                            ) : schedule.status === "now-showing" ? (
                              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md bg-yellow-100 text-yellow-800 uppercase animate-pulse">
                                {schedule.status}
                              </span>
                            ) : schedule.status === "upcoming" ? (
                              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-100 text-gray-800 uppercase">
                                {schedule.status}
                              </span>
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
    </>
  );
};

export default WebinarSchedule;
