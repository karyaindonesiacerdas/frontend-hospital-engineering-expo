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
import { useSettings } from "hooks/useSettings";
import { youtubeParser } from "utils";
import { useUser } from "hooks/useUser";

const MainHall: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openChatModal, setOpenChatModal] = useState(false);
  const { data: dataUser } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const { data: settings } = useSettings();

  if (isLoading || !isAuthenticated) {
    return <FullPageLoader />;
  }

  // console.log({ user });

  return (
    <>
      {/* Chat Button */}
      {(user?.role !== "exhibitor" ||
        [3, 4, 5].includes(dataUser?.package_id)) && (
        <div
          className="fixed right-4 lg:right-6 bottom-4 lg:bottom-6 z-10"
          style={{ backdropFilter: "4px" }}
        >
          <ChatButton onClick={() => setOpenChatModal(true)} />
        </div>
      )}

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
            videoType="main-hall"
            open={openVideoModal}
            setOpen={setOpenVideoModal}
            videoModalDetails={{
              id: 0,
              email: "hospital.engineering.expo@gmail.com",
              name: "Hospital Engineering Forum 2021",
              phone: "+62 858 9377 7283 (Adrian)",
              videoUrl:
                (youtubeParser(settings?.webinar_link || "") &&
                  settings?.webinar_link) ||
                "https://www.youtube.com/watch?v=jS0qVrpKjY4&ab_channel=HospitalEngineeringExpo",
              website: "https://hospital-engineering-expo.com/",
            }}
          />
          {(user?.role !== "exhibitor" ||
            [3, 4, 5].includes(dataUser?.package_id)) && (
            <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
          )}
        </main>

        {/* Button Absolute Position */}
        <ExhibitorListLink />
        <SeminarRoomLink />
        <OpenVideoButton onClick={() => setOpenVideoModal(true)} />
        <Advertisement1 url={settings?.ads1_link} />
        <Advertisement2 url={settings?.ads2_link} />
      </div>
    </>
  );
};

export default MainHall;
