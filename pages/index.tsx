import { useState } from "react";
import type { NextPage } from "next";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { VideoModal } from "@/components/VideoModal";
import {
  Banner1,
  Banner2,
  Poster1,
  Poster2,
  Poster3,
  Poster4,
  Poster5,
  Poster6,
  Poster7,
  Poster8,
  Poster9,
  Poster10,
  BookingConsultation,
  BoothChat,
  ButtonVideo,
} from "@/components/virtual-booth-10";

const Home: NextPage = () => {
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);

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
          backgroundImage: "url('/virtual-booth-10.jpg')",
          aspectRatio: "2 / 1",
        }}
        className="relative bg-center bg-cover bg-no-repeat w-full h-full"
      >
        <Navbar variant="dark" />

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

        {/* Absolute Position */}
        <Banner1 />
        <Banner2 />
        <Poster1 />
        <Poster2 />
        <Poster3 />
        <Poster4 />
        <Poster5 />
        <Poster6 />
        <Poster7 />
        <Poster8 />
        <Poster9 />
        <Poster10 />
        <BookingConsultation />
        <BoothChat onClick={() => setOpenChatModal(true)} />
        <ButtonVideo onClick={() => setOpenVideoModal(true)} />
      </div>
    </>
  );
};

export default Home;
