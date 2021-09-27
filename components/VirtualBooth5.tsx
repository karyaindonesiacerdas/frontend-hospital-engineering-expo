import React, { useState } from "react";
import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";
import { VideoModal } from "@/components/VideoModal";
import {
  NameCard,
  Banner2,
  Poster1,
  Poster2,
  Poster3,
  Poster4,
  Poster5,
  BookingConsultation,
  BoothChat,
  ButtonVideo,
  BoothCS,
} from "@/components/virtual-booth-5";
import { PosterModal } from "@/components/PosterModal";
import { NameCardModal } from "@/components/NameCardModal";
import { CatalogModal } from "@/components/CatalogModal";
import { BookingConsultationModal } from "@/components/BookingConsultationModal";
import { BackButton } from "@/components/BackButton";
import type { Banner, ExhibitorDetails } from "types";

const catalogSrc = "/catalog-example.pdf";

type Props = {
  exhibitor: ExhibitorDetails;
};

export const VirtualBooth5 = ({ exhibitor }: Props) => {
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openPosterModal, setOpenPosterModal] = useState(false);
  const [openNameCardModal, setOpenNameCardModal] = useState(false);
  const [openCatalogModal, setOpenCatalogModal] = useState(false);
  const [openBookingConsultationModal, setOpenBookingConsultationModal] =
    useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner>();
  const [selectedOrder, setSelectedOrder] = useState<number>();

  return (
    <div
      style={{
        backgroundImage: "url('/virtual-booth-5-min.jpg')",
        aspectRatio: "2 / 1",
      }}
      className="relative bg-center bg-cover bg-no-repeat w-full h-full"
    >
      <Navbar variant="dark" currentHref="exhibitors" />

      {/* Main Content */}
      <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
        <BackButton href="/exhibitors" text="Exhibitor List" />
        {/* ### Modals ### */}
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
        <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
        {selectedOrder && (
          <>
            <PosterModal
              exhibitorId={exhibitor.id}
              open={openPosterModal}
              setOpen={setOpenPosterModal}
              selectedBanner={selectedBanner}
              // setSelectedBanner={setSelectedBanner}
              order={selectedOrder}
            />
            <NameCardModal
              open={openNameCardModal}
              setOpen={setOpenNameCardModal}
              selectedBanner={selectedBanner}
              order={selectedOrder}
              exhibitorId={exhibitor.id}
            />
          </>
        )}

        <CatalogModal
          catalog={{ src: catalogSrc }}
          open={openCatalogModal}
          setOpen={setOpenCatalogModal}
        />
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
      <Banner2 onClick={() => setOpenCatalogModal(true)} />
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
      <BookingConsultation
        onClick={() => setOpenBookingConsultationModal(true)}
      />
      <BoothChat
        onClick={() => setOpenChatModal(true)}
        company_logo={exhibitor.company_logo}
      />
      <ButtonVideo
        onClick={() => setOpenVideoModal(true)}
        companyDetails={{
          email: exhibitor.email,
          name: exhibitor.company_name,
          phone: exhibitor.mobile,
          website: exhibitor.company_website,
        }}
      />
      <BoothCS />
    </div>
  );
};
