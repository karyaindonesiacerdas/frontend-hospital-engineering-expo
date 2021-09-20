import { useState } from "react";
import type { NextPage } from "next";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { VideoModal } from "@/components/VideoModal";
import { ChatModal } from "@/components/ChatModal";
import {
  ExhibitorListLink,
  SeminarRoomLink,
  OpenVideoButton,
  Advertisement1,
  Advertisement2,
} from "@/components/main-hall";

const MainHall: NextPage = () => {
  const [openVideoModal, setOpenVideoModal] = useState(false);
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
          backgroundImage: "url('/main-hall.jpg')",
          aspectRatio: "2 / 1",
        }}
        className="relative bg-center bg-cover bg-no-repeat w-full h-full"
      >
        <Navbar currentHref="main-hall" />

        {/* Main Content */}
        <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
          {/* ### Modals ### */}
          <VideoModal
            open={openVideoModal}
            setOpen={setOpenVideoModal}
            videoId="3u_vIdnJYLc"
          />
          <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
        </main>

        {/* Button Absolute Position */}
        <ExhibitorListLink />
        <SeminarRoomLink />
        <OpenVideoButton onClick={() => setOpenVideoModal(true)} />
        <Advertisement1 />
        <Advertisement2 />
      </div>
    </>
  );
};

export default MainHall;
