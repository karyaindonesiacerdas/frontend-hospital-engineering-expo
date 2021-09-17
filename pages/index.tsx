import { useState } from "react";
import type { NextPage } from "next";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import {
  SeminarScreen,
  SeminarLink,
  SeminarTitle,
} from "@/components/seminar-room";

const Home: NextPage = () => {
  const [openChatModal, setOpenChatModal] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <div
        className="absolute right-4 lg:right-6 bottom-4 lg:bottom-6 z-10"
        style={{ backdropFilter: "4px" }}
      >
        <ChatButton onClick={() => setOpenChatModal(true)} />
      </div>

      <div
        style={{
          backgroundImage: "url('/seminar-room.jpeg')",
          aspectRatio: "2 / 1",
        }}
        className="relative bg-center bg-cover bg-no-repeat w-full h-full"
      >
        <Navbar />

        {/* Main Content */}
        <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
          {/* ### Modals ### */}
          <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
        </main>

        {/* Absolute Position */}
        <SeminarTitle />
        <SeminarLink />
        <SeminarScreen />
      </div>
    </>
  );
};

export default Home;
