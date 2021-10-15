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
import { useExhibitors } from "hooks/useExhibitors";
import { PaginationTable } from "@/components/common/table";
import { BackButton } from "@/components/BackButton";
import { UpdateExhibitorPackage } from "@/components/admin/UpdateExhibitorPackage";

const tabs = [
  { name: "Statistics", href: "/admin/statistics", current: false },
  { name: "Exhibitor", href: "/admin/exhibitor", current: true },
  { name: "Booth Visitors", href: "/admin/visitor", current: false },
  { name: "Webinar", href: "/admin/webinar", current: false },
  { name: "Consultation", href: "/admin/consultation", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const AdminExhibitorPage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openEditExhibitorPackage, setOpenEditExhibitorPackage] =
    useState(false);
  const [selectedExhibitor, setSelectedExhibitor] =
    useState<{ id: number; package_id: number }>();

  const {
    data: dataExhibitors,
    isLoading: isLoadingExhibitors,
    isSuccess: isSuccessExhibitors,
  } = useExhibitors({ showAll: true });

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

  const data = useMemo(
    () =>
      isSuccessExhibitors &&
      dataExhibitors?.map((exhibitor) => ({
        id: exhibitor.id,
        name: exhibitor.name,
        company_name: exhibitor.company_name,
        package: exhibitor.package?.name,
        package_id: exhibitor.package_id,
      })),
    [isSuccessExhibitors, dataExhibitors]
  );
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        Footer: "Name",
        accessor: "name",
      },
      {
        Header: "Company Name",
        Footer: "Company Name",
        accessor: "company_name",
      },
      {
        Header: "Package",
        Footer: "Package",
        accessor: "package",
        Cell: ({ value }: any) => {
          const color =
            value?.toLowerCase() === "mercury"
              ? "bg-[#9A9A9A] text-gray-800"
              : value?.toLowerCase() === "mars"
              ? "bg-[#ff3c03] text-white"
              : value?.toLowerCase() === "venus"
              ? "bg-[#FFD966] text-gray-800"
              : value?.toLowerCase() === "uranus"
              ? "bg-[#9DC3E6] text-gray-800"
              : value?.toLowerCase() === "jupiter"
              ? "bg-[#FCE5D6] text-gray-800"
              : "bg-gray-100 text-gray-800";
          return (
            <div
              className={`${color} text-xs font-semibold py-1 px-3 rounded-md uppercase inline-block`}
            >
              {value || "no package"}
            </div>
          );
        },
      },
      {
        Header: "Action",
        Footer: "Action",
        Cell: ({ row }: any) => {
          return (
            <button
              className="text-primary-600 hover:bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold transition"
              onClick={() => {
                setSelectedExhibitor({
                  id: row.original.id,
                  package_id: row.original.package_id,
                });
                setOpenEditExhibitorPackage(true);
              }}
            >
              Update Package
            </button>
          );
        },
      },
    ],
    []
  );

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
        {user?.role === "admin" && selectedExhibitor && (
          <>
            <UpdateExhibitorPackage
              open={openEditExhibitorPackage}
              setOpen={setOpenEditExhibitorPackage}
              selectedExhibitor={selectedExhibitor}
              setSelectedExhibitor={setSelectedExhibitor}
            />
          </>
        )}

        <div className="px-2 xl:px-0 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="pl-0 lg:pl-1 text-xl text-gray-700 font-bold text-center uppercase tracking-wide">
              Admin Page - Exhibitor
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
          <PaginationTable
            showFooter={false}
            data={data || []}
            columns={columns}
            isLoading={isLoadingExhibitors}
            skeletonCols={4}
          />
        </div>
      </main>
    </div>
  );
};

export default AdminExhibitorPage;
