import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { Switch } from "@headlessui/react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { VideoModal } from "@/components/VideoModal";
import {
  NameCard,
  Catalog,
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
  NoBoothChat,
  ButtonVideo,
} from "@/components/virtual-booth-10";
import { PosterModal } from "@/components/PosterModal";
import { NameCardModal } from "@/components/NameCardModal";
import { CatalogModal } from "@/components/CatalogModal";
import { BookingConsultationModal } from "@/components/BookingConsultationModal";
import { BackButton } from "@/components/BackButton";
import { Banner, ExhibitorDetails } from "types";
import { useSettings } from "hooks/useSettings";
import { useUser } from "hooks/useUser";
import { ShareInfoModal } from "./ShareInfoModal";
import { useAuth } from "@/contexts/auth.context";

// const card = {
//   src: "/name-card-example.jpg",
// };

// const catalogSrc = "/catalog-example.pdf";

type Props = {
  exhibitor: ExhibitorDetails;
};

export const VirtualBooth10 = ({ exhibitor }: Props) => {
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openPosterModal, setOpenPosterModal] = useState(false);
  const [openNameCardModal, setOpenNameCardModal] = useState(false);
  const [openCatalogModal, setOpenCatalogModal] = useState(false);
  const [openBookingConsultationModal, setOpenBookingConsultationModal] =
    useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner>();
  const [selectedOrder, setSelectedOrder] = useState<number>();
  const [isOpenShareInfo, setIsOpenShareInfo] = useState(false);
  const cookies = parseCookies();
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const { data: dataUser } = useUser();
  const { data: settings } = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        dataUser?.role === "visitor" &&
        Number(dataUser?.allow_share_info) !== 1 &&
        cookies.answered !== "1"
      ) {
        setIsOpenShareInfo(true);
      }
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [dataUser?.allow_share_info, cookies.answered, dataUser?.role]);

  // console.log({ exhibitor });
  const handleUpdatePublished = async (published: number) => {
    const data = {
      _method: "PUT",
      published,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );

    if (res?.data?.code === 200) {
      await queryClient.invalidateQueries(["exhibitors"]);
      await queryClient.invalidateQueries(["exhibitor"]);
      toast.success("Booth status updated successfully!", {
        position: "top-right",
      });
    } else {
      toast.error("Booth status failed to update", { position: "top-right" });
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/virtual-booth-10-2.jpg')",
        aspectRatio: "2 / 1",
      }}
      className="relative bg-center bg-cover bg-no-repeat w-full h-full"
    >
      <Navbar variant="dark" currentHref="exhibitors" />

      {/* Main Content */}
      <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
        <div className="flex justify-between">
          <BackButton href="/exhibitors" text="Exhibitor List" />
          {exhibitor?.id === dataUser?.id && (
            <div className="bg-white py-0.5 lg:py-2 px-2 lg:px-3 rounded-md shadow-2xl flex space-x-2 items-center">
              <span className="text-gray-900 font-semibold">Open Booth: </span>
              <Switch
                checked={exhibitor.published === 1}
                onChange={(e) => handleUpdatePublished(e ? 1 : 0)}
                className={`${
                  exhibitor.published === 1 ? "bg-primary-600" : "bg-gray-200"
                }
          relative inline-flex flex-shrink-0 h-[28px] w-[52px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Published</span>
                <span
                  aria-hidden="true"
                  className={`${
                    exhibitor.published === 1
                      ? "translate-x-6"
                      : "translate-x-0"
                  }
            pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                />
              </Switch>
            </div>
          )}
        </div>

        {/* ### Modals ### */}
        <ShareInfoModal open={isOpenShareInfo} setOpen={setIsOpenShareInfo} />
        <VideoModal
          videoType="booth"
          open={openVideoModal}
          setOpen={setOpenVideoModal}
          videoModalDetails={{
            id: exhibitor.id,
            email: exhibitor.email,
            name: exhibitor.company_name,
            phone: exhibitor.mobile,
            videoUrl: exhibitor.company_video_url,
            website: exhibitor.company_website,
          }}
        />
        {settings?.is_chat === "1" &&
          (user?.role !== "exhibitor" ||
            user?.id === 2 ||
            [3, 4, 5].includes(dataUser?.package_id)) && (
            <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
          )}
        {/* <ChatModal open={openChatModal} setOpen={setOpenChatModal} /> */}
        {selectedOrder && (
          <>
            <PosterModal
              exhibitorId={exhibitor.id}
              open={openPosterModal}
              setOpen={setOpenPosterModal}
              selectedBanner={selectedBanner}
              order={selectedOrder}
            />
            <NameCardModal
              exhibitorId={exhibitor.id}
              open={openNameCardModal}
              setOpen={setOpenNameCardModal}
              selectedBanner={selectedBanner}
              order={selectedOrder}
            />
            <CatalogModal
              exhibitorId={exhibitor.id}
              open={openCatalogModal}
              setOpen={setOpenCatalogModal}
              selectedBanner={selectedBanner}
              order={selectedOrder}
            />
          </>
        )}
        <BookingConsultationModal
          exhibitorId={exhibitor.id}
          open={openBookingConsultationModal}
          setOpen={setOpenBookingConsultationModal}
        />
      </main>

      {/* Absolute Position */}
      <NameCard
        banner={exhibitor.banners.find((banner) => banner.order === 11)}
        onClick={() => {
          setOpenNameCardModal(true);
          setSelectedOrder(11);
          setSelectedBanner(
            exhibitor.banners.find((banner) => banner.order === 11)
          );
        }}
      />
      <Catalog
        onClick={() => {
          setOpenCatalogModal(true);
          setSelectedOrder(12);
          setSelectedBanner(
            exhibitor.banners.find((banner) => banner.order === 12)
          );
        }}
      />
      {exhibitor.package_id === 5 && (
        <Poster1
          banner={exhibitor.banners.find((banner) => banner.order === 1)}
          onClick={() => {
            setOpenPosterModal(true);
            setSelectedOrder(1);
            setSelectedBanner(
              exhibitor.banners.find((banner) => banner.order === 1)
            );
          }}
        />
      )}
      <Poster2
        banner={exhibitor.banners.find((banner) => banner.order === 2)}
        onClick={() => {
          setOpenPosterModal(true);
          setSelectedOrder(2);
          setSelectedBanner(
            exhibitor.banners.find((banner) => banner.order === 2)
          );
        }}
      />
      <Poster3
        banner={exhibitor.banners.find((banner) => banner.order === 3)}
        onClick={() => {
          setOpenPosterModal(true);
          setSelectedOrder(3);
          setSelectedBanner(
            exhibitor.banners.find((banner) => banner.order === 3)
          );
        }}
      />
      <Poster4
        banner={exhibitor.banners.find((banner) => banner.order === 4)}
        onClick={() => {
          setOpenPosterModal(true);
          setSelectedOrder(4);
          setSelectedBanner(
            exhibitor.banners.find((banner) => banner.order === 4)
          );
        }}
      />
      <Poster5
        banner={exhibitor.banners.find((banner) => banner.order === 5)}
        onClick={() => {
          setOpenPosterModal(true);
          setSelectedOrder(5);
          setSelectedBanner(
            exhibitor.banners.find((banner) => banner.order === 5)
          );
        }}
      />
      <Poster6
        banner={exhibitor.banners.find((banner) => banner.order === 6)}
        onClick={() => {
          setOpenPosterModal(true);
          setSelectedOrder(6);
          setSelectedBanner(
            exhibitor.banners.find((banner) => banner.order === 6)
          );
        }}
      />
      <Poster7
        banner={exhibitor.banners.find((banner) => banner.order === 7)}
        onClick={() => {
          setOpenPosterModal(true);
          setSelectedOrder(7);
          setSelectedBanner(
            exhibitor.banners.find((banner) => banner.order === 7)
          );
        }}
      />
      <Poster8
        banner={exhibitor.banners.find((banner) => banner.order === 8)}
        onClick={() => {
          setOpenPosterModal(true);
          setSelectedOrder(8);
          setSelectedBanner(
            exhibitor.banners.find((banner) => banner.order === 8)
          );
        }}
      />
      <Poster9
        banner={exhibitor.banners.find((banner) => banner.order === 9)}
        onClick={() => {
          setOpenPosterModal(true);
          setSelectedOrder(9);
          setSelectedBanner(
            exhibitor.banners.find((banner) => banner.order === 9)
          );
        }}
      />
      {exhibitor.package_id === 5 && (
        <Poster10
          banner={exhibitor.banners.find((banner) => banner.order === 10)}
          onClick={() => {
            setOpenPosterModal(true);
            setSelectedOrder(10);
            setSelectedBanner(
              exhibitor.banners.find((banner) => banner.order === 10)
            );
          }}
        />
      )}
      <BookingConsultation
        onClick={() => setOpenBookingConsultationModal(true)}
      />

      <NoBoothChat company_logo={exhibitor.company_logo} />
      {settings?.is_chat === "1" && user?.role !== "exhibitor" && (
        <BoothChat
          onClick={() => setOpenChatModal(true)}
          company_logo={exhibitor.company_logo}
          exhibitorId={exhibitor.id}
        />
      )}

      <ButtonVideo
        onClick={() => setOpenVideoModal(true)}
        companyDetails={{
          email: exhibitor.email,
          name: exhibitor.company_name,
          phone: exhibitor.mobile,
          website: exhibitor.company_website,
          videoURL: exhibitor.company_video_url,
        }}
      />
    </div>
  );
};
