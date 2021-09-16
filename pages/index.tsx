import { useState } from "react";
import type { NextPage } from "next";
import "plyr-react/dist/plyr.css";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { VideoModal } from "@/components/VideoModal";
import { ChatModal } from "@/components/ChatModal";

const Home: NextPage = () => {
  const [openVideoModal, setOpenVideoModal] = useState(false);
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
          backgroundImage: "url('/main-hall.jpg')",
        }}
        className="relative bg-center bg-cover bg-no-repeat w-full h-full aspect-w-2 aspect-h-1"
      >
        <Navbar />

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
      </div>
    </>
  );
};

export default Home;
