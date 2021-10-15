/* eslint-disable react/display-name */
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";

import { BackButton } from "@/components/BackButton";
// import { Statistics } from "@/components/admin/Statistics";
// import { useSettings } from "hooks/useSettings";
const Statistics = dynamic(() => import("@/components/admin/Statistics"), {
  ssr: false,
});

const tabs = [
  { name: "Statistics", href: "/admin/statistics", current: true },
  { name: "Exhibitor", href: "/admin/exhibitor", current: false },
  { name: "Booth Visitors", href: "/admin/visitor", current: false },
  { name: "Webinar", href: "/admin/webinar", current: false },
  { name: "Consultation", href: "/admin/consultation", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const AdminConsultationPage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);

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

        <div className="px-2 xl:px-0 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="pl-0 lg:pl-1 text-xl text-gray-700 font-bold text-center lg:text-left uppercase tracking-wide">
              Admin Page - Statistics
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

          {/* Table */}
          <Statistics />
        </div>
      </main>
    </div>
  );
};

export default AdminConsultationPage;
