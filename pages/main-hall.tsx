import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

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
import { useUser } from "hooks/useUser";
import { SocketProvider, useSocket } from "socket/socket.context";
import { ButtonHelpDesk } from "@/components/main-hall/ButtonHelpDesk";
import { RunningText } from "@/components/RunningText";

const MainHall: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openChatModal, setOpenChatModal] = useState(false);
  const { data: dataUser } = useUser();
  const cookies = parseCookies();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const tracking = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracker`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error create tracking");
        }

        await res.json();
      } catch (error) {
        console.log({ error });
      }
    };
    tracking();
  }, [cookies.access_token]);

  const { data: settings } = useSettings();

  if (isLoading || !isAuthenticated) {
    return <FullPageLoader />;
  }

  return (
    <SocketProvider>
      {/* Chat Button */}
      {settings?.is_chat === "1" &&
        (user?.role !== "exhibitor" ||
          user?.id === 2 ||
          user?.ala_carte?.includes("chat") ||
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
        <RunningText />
        <Navbar currentHref="main-hall" />

        {/* Main Content */}
        <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
          {/* ### Modals ### */}
          {settings?.webinar_link && (
            <VideoModal
              videoType="main-hall"
              open={openVideoModal}
              setOpen={setOpenVideoModal}
              videoModalDetails={{
                id: 0,
                email: "hospital.engineering.expo@gmail.com",
                name: "Hospital Engineering Forum 2021",
                phone: "+62 858 9377 7283 (Adrian)",
                videoUrl: settings.webinar_link,
                website: "https://hospital-engineering-expo.com/",
              }}
            />
          )}
          {settings?.is_chat === "1" &&
            (user?.role !== "exhibitor" ||
              user?.id === 2 ||
              user?.ala_carte?.includes("chat") ||
              [3, 4, 5].includes(dataUser?.package_id)) && (
              <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
            )}
        </main>

        {/* Button Absolute Position */}
        <ExhibitorListLink />
        <SeminarRoomLink />
        <OpenVideoButton
          onClick={() => setOpenVideoModal(true)}
          videoURL={settings?.webinar_link}
        />
        <Advertisement1 url={settings?.ads1_link} />
        <Advertisement2 url={settings?.ads2_link} />
        {settings?.is_chat === "1" &&
          (user?.role !== "exhibitor" ||
            user?.ala_carte?.includes("chat") ||
            [3, 4, 5].includes(dataUser?.package_id)) && (
            <ButtonHelpDesk onClick={() => setOpenChatModal(true)} />
          )}
        {/* <RunningText /> */}
      </div>
    </SocketProvider>
  );
};

export default MainHall;
