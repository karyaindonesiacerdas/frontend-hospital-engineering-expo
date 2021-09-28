import { useState, useEffect } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import {
  BoardHeader,
  // Board,
  SearchAndFilter,
} from "@/components/exhibitor-list";
import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { BackButton } from "@/components/BackButton";
import { useExhibitors } from "hooks/useExhibitors";

const Board = dynamic(() => import("@/components/exhibitor-list/Board"));

const Exhibitors: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const { data, error } = useExhibitors({ showAll: false });

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

      <div
        style={{
          backgroundImage: "url('/exhibitor-list.jpg')",
          aspectRatio: "2 / 1",
        }}
        className="relative bg-center bg-cover bg-no-repeat w-full h-full"
      >
        <Navbar variant="dark" currentHref="exhibitors" />

        {/* Main Content */}
        <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
          <BackButton href="/main-hall" text="Main Hall" />
          {/* ### Modals ### */}
          <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
        </main>

        {/* Absolute Position */}
        <BoardHeader />
        {data && <Board exhibitors={data} />}
        {/* <SearchAndFilter /> */}
      </div>
    </>
  );
};

export default Exhibitors;
