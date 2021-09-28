import { useState, useEffect, FormEventHandler, FormEvent } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { parseCookies } from "nookies";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { UpdateStatus } from "@/components/consultation/UpdateStatus";
import { useUser } from "hooks/useUser";
// import { AddSlotTime } from "@/components/consultation/AddSlotTime";

type ConsultationDetail = {
  id: number;
  date: string;
  time: string;
  status: number;
  visitor: {
    id: number;
    name: string;
    institution_name: string;
  };
  exhibitor: {
    id: number;
    company_name: string;
  };
};

const useConsultations = () => {
  const cookies = parseCookies();

  return useQuery<ConsultationDetail[], Error>(
    ["consultations", cookies.access_token],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/consultation`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
        .then((res) => res.data.data),
    { enabled: Boolean(cookies.access_token) }
  );
};

const Consultation: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
  // const [openAddSlotTimeModal, setOpenAddSlotTimeModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] =
    useState<{ id: number; status: number }>();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const { data, isLoading: isLoadingConsultations } = useConsultations();
  // console.log({ consultation: data });

  // console.log({ user });

  // const { data: dataUser } = useUser();
  // console.log({ user: dataUser });

  if (isLoading || !isAuthenticated || isLoadingConsultations) {
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
        {(user?.role === "exhibitor" || user?.role === "admin") &&
          selectedConsultation && (
            <>
              <UpdateStatus
                open={openChangeStatusModal}
                setOpen={setOpenChangeStatusModal}
                selectedConsultation={selectedConsultation}
              />
            </>
          )}
        {/* {user?.role === "exhibitor" && (
          <AddSlotTime
            open={openAddSlotTimeModal}
            setOpen={setOpenAddSlotTimeModal}
          />
        )} */}

        <div className="px-2 xl:px-0 py-6">
          <div className="flex items-center justify-between">
            <h2 className="pl-0 lg:pl-1 text-xl text-gray-700 mb-4 font-bold uppercase tracking-wide">
              Your Consultation Booking
            </h2>
            {/* {user?.role === "exhibitor" && (
              <button
                onClick={() => {
                  console.log("click");
                  setOpenAddSlotTimeModal(true);
                }}
                className="py-2 px-4 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700"
              >
                Add Slot Time
              </button>
            )} */}
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
                          className="hidden sm:block px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Time
                        </th>
                        {(user?.role === "visitor" ||
                          user?.role === "admin") && (
                          <th
                            scope="col"
                            className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Exhibitor
                          </th>
                        )}
                        {(user?.role === "exhibitor" ||
                          user?.role === "admin") && (
                          <th
                            scope="col"
                            className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Visitor
                          </th>
                        )}

                        <th
                          scope="col"
                          className="relative px-3 sm:px-6 py-3"
                        ></th>
                        {(user?.role === "exhibitor" ||
                          user?.role === "admin") && (
                          <th
                            scope="col"
                            className="relative px-3 sm:px-6 py-3"
                          ></th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data?.map((consultation, index) => (
                        <tr key={`${consultation.id}`}>
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
                          {(user?.role === "visitor" ||
                            user?.role === "admin") && (
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              <Link
                                href={`/exhibitors/${consultation?.exhibitor?.id}`}
                              >
                                <a className="text-sm text-gray-900 hover:text-primary">
                                  {consultation?.exhibitor?.company_name}
                                </a>
                              </Link>
                              {/* <div className="text-sm text-gray-500">
                                {consultation.engineering_areas.join(", ")}
                              </div> */}
                            </td>
                          )}
                          {(user?.role === "exhibitor" ||
                            user?.role === "admin") && (
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {consultation.visitor?.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {consultation.visitor?.institution_name}
                              </div>
                            </td>
                          )}

                          <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                            {consultation.status === 3 ? (
                              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-green-100 text-green-800">
                                Done
                              </span>
                            ) : consultation.status === 4 ? (
                              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-red-100 text-red-800">
                                Timeout
                              </span>
                            ) : consultation.status === 2 ? (
                              <a
                                href="https://us02web.zoom.us/j/89035020972?pwd=T0lLSjlRTnVBRGVYdnVmbFlMcG1wQT09"
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-blue-500 hover:bg-blue-600 hover:animate-none transition text-white animate-pulse"
                              >
                                Join Zoom
                              </a>
                            ) : consultation.status === 1 ? (
                              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-gray-100 text-gray-800">
                                Upcoming
                              </span>
                            ) : null}
                          </td>

                          {(user?.role === "exhibitor" ||
                            user?.role === "admin") && (
                            <td className="px-4 py-2  sm:px-6 sm:py-4 whitespace-nowrap">
                              <button
                                className="text-primary-600 hover:bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold transition"
                                onClick={() => {
                                  setSelectedConsultation({
                                    id: consultation.id,
                                    status: consultation.status,
                                  });
                                  setOpenChangeStatusModal(true);
                                }}
                              >
                                Update Status
                              </button>
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
    </>
  );
};

export default Consultation;
