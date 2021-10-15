import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { parseCookies } from "nookies";

import { ChatButton } from "@/components/ChatButton";
import { ChatModal } from "@/components/ChatModal";
import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { VirtualBooth5 } from "@/components/VirtualBooth5";
import { VirtualBooth10 } from "@/components/VirtualBooth10";
import type { ExhibitorDetails } from "types";
import { useUser } from "hooks/useUser";
import { useSettings } from "hooks/useSettings";
import { SocketProvider } from "socket/socket.context";

const useExhibitor = ({ id }: any) => {
  const cookies = parseCookies();

  return useQuery<ExhibitorDetails, Error>(
    ["exhibitor", id],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/exhibitor/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
        .then((res) => res.data.data),
    { enabled: Boolean(id), staleTime: 1000 * 60 * 5, retry: 2 }
  );
};

const Exhibitors: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const { data: dataUser } = useUser();
  const { data: settings } = useSettings();

  // =================================
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_WEB_STATUS === "maintenance") {
      router.push("/maintenance");
    }
  }, [router]);
  // =================================

  // Check is user authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Get Exhibitor Details
  const {
    data,
    isLoading: isLoadingExhibitor,
    isError,
    isSuccess,
  } = useExhibitor({
    id: router.query.id,
  });

  // console.log({ data });

  // Redirect to 404 if data doesn't exists or error happens
  useEffect(() => {
    if ((!data && isSuccess) || isError) {
      router.replace("/404");
    }
  }, [data, isSuccess, isError, router]);

  useEffect(() => {
    if (isSuccess && (!data?.package_id || data?.package_id === 2)) {
      router.replace("/exhibitors");
    }
  }, [data?.package_id, isSuccess, router]);

  // Display Loader when fetch auth data exhibitor data
  if (isLoading || !isAuthenticated || isLoadingExhibitor || !data) {
    return <FullPageLoader />;
  }

  // console.log({ user, dataUser });

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

      {settings?.is_chat === "1" &&
        (user?.role !== "exhibitor" ||
          user?.id === 2 ||
          user?.ala_carte?.includes("chat") ||
          [3, 4, 5].includes(dataUser?.package_id)) && (
          <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
        )}

      {data.package_id ? (
        data.package_id === 4 || data.package_id === 5 ? (
          <VirtualBooth10 exhibitor={data} />
        ) : data.package_id === 1 || data.package_id === 3 ? (
          <VirtualBooth5 exhibitor={data} />
        ) : null
      ) : null}
    </SocketProvider>
  );
};

export default Exhibitors;
