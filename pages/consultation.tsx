import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";

const consultations = [
  {
    date: "2 October 2021",
    time: "08.00 - 09.00",
    exhibitor: "PT Karya Indonesia Cerdas",
    link_booth: "virtual-booth-5.html",
    engineering_areas: ["Hospital Informatics", "Hospital Electrics"],
    status: "done",
    link_zoom: "https://zoom.us",
  },
  {
    date: "3 October 2021",
    time: "08.00 - 09.00",
    exhibitor: "PT Karya Indonesia Cerdas",
    link_booth: "virtual-booth-5.html",
    engineering_areas: ["Hospital Informatics"],
    status: "timeout",
    link_zoom: "https://zoom.us",
  },
  {
    date: "3 October 2021",
    time: "11.00 - 11.30",
    exhibitor: "PT Karya Indonesia Cerdas",
    link_booth: "virtual-booth-5.html",
    engineering_areas: ["Hospital Informatics"],
    status: "current",
    link_zoom: "https://zoom.us",
  },
  {
    date: "4 October 2021",
    time: "11.00 - 11.30",
    exhibitor: "PT Karya Indonesia Cerdas",
    link_booth: "virtual-booth-5.html",
    engineering_areas: ["Hospital Informatics", "Hospital Electrics"],
    status: "upcoming",
    link_zoom: "https://zoom.us",
  },
];

const Consultation: NextPage = () => {
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

      <Navbar variant="dark" currentHref="consultation" />

      {/* Main Content */}
      <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
        {/* ### Modals ### */}
        <ChatModal open={openChatModal} setOpen={setOpenChatModal} />

        <div className="px-2 xl:px-0 py-6">
          <h2 className="pl-0 lg:pl-1 text-xl text-gray-700 mb-4 font-bold text-center lg:text-left uppercase tracking-wide">
            Your Consultation Booking
          </h2>
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
                          className="hidden sm:block px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Exhibitor
                        </th>
                        <th
                          scope="col"
                          className="relative px-3 sm:px-6 py-3"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {consultations.map((consultation, index) => (
                        <tr key={`${consultation.exhibitor}-${index}`}>
                          <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {consultation.date}
                            </div>
                            <div className="block sm:hidden text-sm font-medium text-gray-500">
                              {consultation.time}
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {consultation.time}
                            </div>
                          </td>
                          <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                            <a
                              x-text="consultation.exhibitor"
                              href={consultation.link_booth}
                              className="text-sm text-gray-900 hover:text-primary"
                            >
                              {consultation.exhibitor}
                            </a>
                            <div className="text-sm text-gray-500">
                              {consultation.engineering_areas.join(", ")}
                            </div>
                          </td>
                          <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                            {consultation.status === "done" ? (
                              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-green-100 text-green-800">
                                {consultation.status}
                              </span>
                            ) : consultation.status === "timeout" ? (
                              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-red-100 text-red-800">
                                {consultation.status}
                              </span>
                            ) : consultation.status === "current" ? (
                              <a
                                href={consultation.link_zoom}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-blue-500 hover:bg-blue-600 hover:animate-none transition text-white animate-bounce"
                              >
                                Join Zoom
                              </a>
                            ) : consultation.status === "upcoming" ? (
                              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-gray-100 text-gray-800">
                                {consultation.status}
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

export default Consultation;
