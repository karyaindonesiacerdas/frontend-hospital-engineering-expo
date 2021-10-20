/* eslint-disable react/display-name */
import { useState, useEffect, useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tab } from "@headlessui/react";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { PaginationTable } from "@/components/common/table";
import { useConsultations } from "../../hooks/useConsultation";
import { UpdateStatus } from "@/components/consultation/UpdateStatus";
import { BackButton } from "@/components/BackButton";
import { useSettings } from "hooks/useSettings";
import { DeleteConsultation } from "@/components/consultation/DeleteConsultation";
import { ListConsultation } from "@/components/admin/ListConsultation";
import { ActionConsultation } from "@/components/admin/ActionConsultation";

const tabs = [
  { name: "Statistics", href: "/admin/statistics", current: false },
  { name: "Exhibitor", href: "/admin/exhibitor", current: false },
  { name: "Booth Visitors", href: "/admin/visitor", current: false },
  { name: "Webinar", href: "/admin/webinar", current: false },
  { name: "Consultation", href: "/admin/consultation", current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const AdminConsultationPage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] =
    useState<{ id: number; status: number }>();

  const {
    data: dataConsultations,
    isLoading: isLoadingConsultations,
    isSuccess: isSuccessConsultations,
  } = useConsultations();
  const { data: settings } = useSettings();

  // console.log({ dataConsultations });

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

  useEffect(() => {
    if (!isLoading && user?.role !== "admin") {
      router.push("/main-hall");
    }
  }, [router, user, isLoading]);

  // const data = useMemo(
  //   () =>
  //     isSuccessConsultations &&
  //     dataConsultations?.map((consultation) => ({
  //       id: consultation.id,
  //       date: consultation.date,
  //       time: consultation.time,
  //       exhibitor: consultation.exhibitor?.company_name,
  //       visitor: consultation.visitor,
  //       status: consultation.status,
  //     })),
  //   [isSuccessConsultations, dataConsultations]
  // );
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "Date",
  //       Footer: "Date",
  //       accessor: "date",
  //     },
  //     {
  //       Header: "Time",
  //       Footer: "Time",
  //       accessor: "time",
  //     },
  //     {
  //       Header: "Exhibitor",
  //       Footer: "Exhibitor",
  //       accessor: "exhibitor",
  //     },
  //     {
  //       Header: "Visitor",
  //       Footer: "Visitor",
  //       accessor: "visitor",
  //       Cell: ({ value }: any) => (
  //         <div>
  //           <div className="text-gray-900">{value?.name}</div>
  //           <div className="text-sm text-gray-500">
  //             {value?.institution_name}
  //           </div>
  //           <div className="text-sm text-gray-500">{value?.mobile}</div>
  //         </div>
  //       ),
  //     },
  //     {
  //       Header: "Status",
  //       Footer: "Status",
  //       accessor: "status",
  //       Cell: ({ value }: any) => (
  //         <div>
  //           {value === 3 ? (
  //             <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-green-100 text-green-800">
  //               Done
  //             </span>
  //           ) : value === 4 ? (
  //             <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-red-100 text-red-800">
  //               Timeout
  //             </span>
  //           ) : value === 2 ? (
  //             <a
  //               href={settings?.zoom_business_link}
  //               target="_blank"
  //               rel="noreferrer"
  //               className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-blue-500 hover:bg-blue-600 hover:animate-none transition text-white animate-pulse"
  //             >
  //               Join Zoom
  //             </a>
  //           ) : value === 1 ? (
  //             <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-gray-100 text-gray-800">
  //               Upcoming
  //             </span>
  //           ) : null}
  //         </div>
  //       ),
  //     },
  //     {
  //       Header: "Action",
  //       Footer: "Action",
  //       Cell: ({ row }: any) => {
  //         return (
  //           <div className="flex space-x-3">
  //             <button
  //               className="text-primary-600 hover:bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold transition"
  //               onClick={() => {
  //                 setSelectedConsultation({
  //                   id: row.original.id,
  //                   status: row.original.status,
  //                 });
  //                 setOpenChangeStatusModal(true);
  //               }}
  //             >
  //               Update Status
  //             </button>
  //             <button
  //               onClick={() => {
  //                 setSelectedConsultation({
  //                   id: row.original.id,
  //                   status: row.original.status,
  //                 });
  //                 setOpenDeleteModal(true);
  //               }}
  //               className="text-sm font-medium text-red-600 hover:text-red-700"
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         );
  //       },
  //     },
  //   ],
  //   [settings?.zoom_business_link]
  // );

  if (isLoading || !isAuthenticated || isLoadingConsultations) {
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
        {user?.role === "admin" && selectedConsultation && (
          <>
            <UpdateStatus
              open={openChangeStatusModal}
              setOpen={setOpenChangeStatusModal}
              selectedConsultation={selectedConsultation}
            />
            <DeleteConsultation
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
              selectedConsultation={selectedConsultation}
            />
          </>
        )}

        <div className="px-2 xl:px-0 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="pl-0 lg:pl-1 text-xl text-gray-700 font-bold text-center lg:text-left uppercase tracking-wide">
              Admin Page - Consultation
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

          <Tab.Group>
            <Tab.List className="grid grid-cols-2 gap-2 mb-2">
              <Tab>
                {({ selected }) => (
                  <div
                    className={`p-2 font-bold text-lg uppercase bg-white rounded-md shadow ${
                      selected ? "bg-primary-600 text-white" : "bg-white"
                    }`}
                  >
                    Action
                  </div>
                )}
              </Tab>
              <Tab>
                {({ selected }) => (
                  <div
                    className={`p-2 font-bold text-lg uppercase bg-white rounded-md shadow ${
                      selected ? "bg-primary-600 text-white" : "bg-white"
                    }`}
                  >
                    List
                  </div>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                {" "}
                {/* <PaginationTable
                  showFooter={false}
                  data={data || []}
                  columns={columns}
                  isLoading={isLoadingConsultations}
                  skeletonCols={4}
                /> */}
                <div className="overflow-hidden">
                  <ActionConsultation
                    dataConsultations={dataConsultations}
                    setOpenChangeStatusModal={setOpenChangeStatusModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    setSelectedConsultation={setSelectedConsultation}
                    settings={settings}
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="overflow-hidden">
                  <ListConsultation dataConsultations={dataConsultations} />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          {/* Table */}
        </div>
      </main>
    </div>
  );
};

export default AdminConsultationPage;
