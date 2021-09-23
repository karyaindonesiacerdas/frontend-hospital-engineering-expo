import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { VideoModal } from "@/components/VideoModal";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader } from "@/components/common/FullPageLoader";
import {
  ExhibitorListLink,
  SeminarRoomLink,
  OpenVideoButton,
  Advertisement1,
  Advertisement2,
} from "@/components/main-hall";
import { useAuth } from "@/contexts/auth.context";

const MainHall: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openChatModal, setOpenChatModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <FullPageLoader />;
  }

  console.log({ user });

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
            videoId="i6veQ8MvNSM"
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
