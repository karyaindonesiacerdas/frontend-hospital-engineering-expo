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
  const { isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const boothType: string = "Booth10";

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

  // Redirect to 404 if data doesn't exists or error happens
  useEffect(() => {
    if ((!data && isSuccess) || isError) {
      router.replace("/404");
    }
  }, [data, isSuccess, isError, router]);

  // Display Loader when fetch auth data exhibitor data
  if (isLoading || !isAuthenticated || isLoadingExhibitor || !data) {
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

      <ChatModal open={openChatModal} setOpen={setOpenChatModal} />

      {boothType === "Booth10" ? (
        <VirtualBooth10 exhibitor={data} />
      ) : (
        <VirtualBooth5 exhibitor={data} />
      )}
    </>
  );
};

export default Exhibitors;
