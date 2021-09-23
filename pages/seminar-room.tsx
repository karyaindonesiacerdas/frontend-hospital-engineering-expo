import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import {
  SeminarScreen,
  SeminarLink,
  SeminarTitle,
} from "@/components/seminar-room";
import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { BackButton } from "@/components/BackButton";

const SeminarRoom: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

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
          backgroundImage: "url('/seminar-room.jpeg')",
          aspectRatio: "2 / 1",
        }}
        className="relative bg-center bg-cover bg-no-repeat w-full h-full"
      >
        <Navbar currentHref="seminar-room" />

        {/* Main Content */}
        <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
          {/* ### Modals ### */}
          <BackButton href="/main-hall" text="Main Hall" />
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

export default SeminarRoom;
