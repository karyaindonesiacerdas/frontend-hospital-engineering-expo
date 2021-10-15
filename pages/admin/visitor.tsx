/* eslint-disable react/display-name */
import { useState, useEffect, useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { RundownDetail, useRundowns } from "hooks/useRundowns";
import { AddRundown } from "@/components/rundown/AddRundown";
import { EditRundown } from "@/components/rundown/EditRundown";
import { DeleteRundown } from "@/components/rundown/DeleteRundown";
import { useBoothStatistics } from "hooks/useBoothStatistics";
import { Tab } from "@headlessui/react";
import { BackButton } from "@/components/BackButton";
import { VisitorViewsDetail } from "@/components/admin/VisitorViewsDetail";

const tabs = [
  { name: "Statistics", href: "/admin/statistics", current: false },
  { name: "Exhibitor", href: "/admin/exhibitor", current: false },
  { name: "Booth Visitors", href: "/admin/visitor", current: true },
  { name: "Webinar", href: "/admin/webinar", current: false },
  { name: "Consultation", href: "/admin/consultation", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const AdminVisitorPage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openAddRundownModal, setOpenAddRundownModal] = useState(false);
  const [openEditRundownModal, setOpenEditRundownModal] = useState(false);
  const [openDeleteRundownModal, setOpenDeleteRundownModal] = useState(false);
  const [selectedRundown, setSelectedRundown] = useState<RundownDetail>();
  const { data: statistics } = useBoothStatistics();

  // console.log({ statistics });

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

  if (isLoading || !isAuthenticated) {
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
            <h2 className="pl-0 lg:pl-1 text-xl text-gray-700 font-bold text-center uppercase tracking-wide">
              Admin Page - Visitor
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

          <div className="mb-4">
            <BackButton href="/admin" text="Admin" />
          </div>

          {/* Table */}
          <Tab.Group>
            <Tab.List className="grid grid-cols-2 gap-2 mb-4">
              <Tab>
                {({ selected }) => (
                  <div
                    className={`p-2 font-bold text-lg uppercase bg-white rounded-md shadow ${
                      selected ? "bg-primary-600 text-white" : "bg-white"
                    }`}
                  >
                    Overview
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
                    Detail
                  </div>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="grid grid-cols-3 gap-6">
                  {statistics
                    ?.filter((statistic) => statistic.total_visitors > 0)
                    .map((statistic) => (
                      <div
                        key={statistic.id}
                        className="bg-white p-6 shadow rounded-md flex flex-col items-center justify-center space-y-4"
                      >
                        <span className="font-semibold text-gray-700">
                          {statistic.company_name}
                        </span>
                        <span className="text-2xl font-extrabold">
                          {statistic.total_visitors}{" "}
                          <span className="text-xs font-semibold">
                            Visitors
                          </span>
                        </span>
                      </div>
                    ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <VisitorViewsDetail />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
    </div>
  );
};

export default AdminVisitorPage;
