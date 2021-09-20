import { useState } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import {
  BoardHeader,
  // Board,
  SearchAndFilter,
} from "@/components/exhibitor-list";

const Board = dynamic(() => import("@/components/exhibitor-list/Board"));

const Exhibitors: NextPage = () => {
  const [openChatModal, setOpenChatModal] = useState(false);

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
          {/* ### Modals ### */}
          <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
        </main>

        {/* Absolute Position */}
        <BoardHeader />
        <Board />
        <SearchAndFilter />
      </div>
    </>
  );
};

export default Exhibitors;
