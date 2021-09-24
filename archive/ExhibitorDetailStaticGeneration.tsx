import { useState, useEffect } from "react";
import type {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useRouter } from "next/router";

import { ChatButton } from "@/components/ChatButton";
import { ChatModal } from "@/components/ChatModal";

import { FullPageLoader } from "@/components/common";
import { useAuth } from "@/contexts/auth.context";
import { BackButton } from "@/components/BackButton";
import axios from "axios";
import { parseCookies } from "nookies";
import { VirtualBooth5 } from "@/components/VirtualBooth5";
import { VirtualBooth10 } from "@/components/VirtualBooth10";
import type { ExhibitorDetails, Exhibitor, BoothType } from "types";

type PageProps = {
  exhibitor: ExhibitorDetails;
};

const Exhibitors: NextPage<PageProps> = ({ exhibitor }) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openChatModal, setOpenChatModal] = useState(false);
  const boothType: string = "Booth5";

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

      <ChatModal open={openChatModal} setOpen={setOpenChatModal} />

      {boothType === "Booth10" ? (
        <VirtualBooth10 exhibitor={exhibitor} />
      ) : (
        <VirtualBooth5 exhibitor={exhibitor} />
      )}
    </>
  );
};

export default Exhibitors;

export async function getStaticPaths() {
  type Response = {
    code: number;
    type: string;
    message: string;
    data: Exhibitor[];
  };
  const cookies = parseCookies();
  const exhibitors = await axios
    .get<Response>(`${process.env.NEXT_PUBLIC_API_URL}/exhibitor`, {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`,
      },
    })
    .then((res) => res.data.data);

  const paths = exhibitors.map((exhibitor) => {
    return {
      params: { id: exhibitor.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  type Response = {
    code: number;
    type: string;
    message: string;
    data: ExhibitorDetails;
  };

  const cookies = parseCookies();

  const exhibitor = await axios
    .get<Response>(
      `${process.env.NEXT_PUBLIC_API_URL}/exhibitor/${context?.params?.id}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    )
    .then((res) => res.data.data);

  return {
    props: {
      exhibitor,
    },
  };
}
