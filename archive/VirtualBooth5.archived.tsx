// import { useState, useEffect } from "react";
// import type { NextPage } from "next";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { parseCookies } from "nookies";

// import { ChatButton } from "@/components/ChatButton";
// import { Navbar } from "@/components/Navbar";
// import { ChatModal } from "@/components/ChatModal";
// import { VideoModal } from "@/components/VideoModal";
// import {
//   Banner1,
//   Banner2,
//   Poster1,
//   Poster2,
//   Poster3,
//   Poster4,
//   Poster5,
//   BookingConsultation,
//   BoothChat,
//   ButtonVideo,
//   BoothCS,
// } from "@/components/virtual-booth-5";
// import { PosterModal } from "@/components/PosterModal";
// import { NameCardModal } from "@/components/NameCardModal";
// import { CatalogModal } from "@/components/CatalogModal";
// import { BookingConsultationModal } from "@/components/BookingConsultationModal";
// import { Poster } from "@/components/virtual-booth-5/type";
// import { FullPageLoader } from "@/components/common";
// import { useAuth } from "@/contexts/auth.context";
// import { BackButton } from "@/components/BackButton";

// const posters = {
//   poster1: {
//     number: 1,
//     src: "/brosur1.jpg",
//     title: "Product 1",
//   },
//   poster2: {
//     number: 2,
//     src: "/brosur2.jpg",
//     title: "Product 2",
//   },
//   poster3: {
//     number: 3,
//     src: "/brosur3.jpg",
//     title: "Product 3",
//   },
//   poster4: {
//     number: 4,
//     src: "/brosur4.jpg",
//     title: "Product 4",
//   },
//   poster5: {
//     number: 5,
//     src: "/brosur5.jpg",
//     title: "Product 5",
//   },
// };

// const card = {
//   src: "/name-card-example.jpg",
// };

// const catalogSrc = "/catalog-example.pdf";

// const VirtualBooth5: NextPage = (props) => {
//   const router = useRouter();
//   const { user, isAuthenticated, isLoading } = useAuth();
//   const [openChatModal, setOpenChatModal] = useState(false);
//   const [openVideoModal, setOpenVideoModal] = useState(false);
//   const [openPosterModal, setOpenPosterModal] = useState(false);
//   const [openNameCardModal, setOpenNameCardModal] = useState(false);
//   const [openCatalogModal, setOpenCatalogModal] = useState(false);
//   const [openBookingConsultationModal, setOpenBookingConsultationModal] =
//     useState(false);
//   const [selectedPoster, setSelectedPoster] = useState<Poster>();
//   const cookies = parseCookies();

//   console.log({ props });

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       router.push("/login");
//     }
//   }, [isAuthenticated, isLoading, router]);

//   useEffect(() => {
//     const fetchUserDetail = async () => {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${cookies.access_token}`,
//           },
//         }
//       );
//       console.log({ res });
//     };
//     fetchUserDetail();
//   }, [cookies.access_token]);

//   if (isLoading || !isAuthenticated) {
//     return <FullPageLoader />;
//   }

//   return (
//     <>
//       {/* Chat Button */}
//       <div
//         className="fixed right-4 lg:right-6 bottom-4 lg:bottom-6 z-10"
//         style={{ backdropFilter: "4px" }}
//       >
//         <ChatButton onClick={() => setOpenChatModal(true)} />
//       </div>

//       <div
//         style={{
//           backgroundImage: "url('/virtual-booth-5-min.jpg')",
//           aspectRatio: "2 / 1",
//         }}
//         className="relative bg-center bg-cover bg-no-repeat w-full h-full"
//       >
//         <Navbar variant="dark" currentHref="exhibitors" />

//         {/* Main Content */}
//         <main className="px-1.5 lg:px-2 pb-2 max-w-7xl mx-auto">
//           <BackButton href="/exhibitors" text="Exhibitor List" />
//           {/* ### Modals ### */}
//           <VideoModal
//             open={openVideoModal}
//             setOpen={setOpenVideoModal}
//             videoId="i6veQ8MvNSM"
//           />
//           <ChatModal open={openChatModal} setOpen={setOpenChatModal} />
//           <PosterModal
//             open={openPosterModal}
//             setOpen={setOpenPosterModal}
//             selectedPoster={selectedPoster}
//           />
//           <NameCardModal
//             open={openNameCardModal}
//             setOpen={setOpenNameCardModal}
//             card={card}
//           />
//           <CatalogModal
//             catalog={{ src: catalogSrc }}
//             open={openCatalogModal}
//             setOpen={setOpenCatalogModal}
//           />
//           <BookingConsultationModal
//             open={openBookingConsultationModal}
//             setOpen={setOpenBookingConsultationModal}
//           />
//         </main>

//         {/* Absolute Position */}
//         <Banner1 onClick={() => setOpenNameCardModal(true)} card={card} />
//         <Banner2 onClick={() => setOpenCatalogModal(true)} />
//         <Poster1
//           poster={posters.poster1}
//           onClick={() => {
//             setOpenPosterModal(true);
//             setSelectedPoster(posters.poster1);
//           }}
//         />
//         <Poster2
//           poster={posters.poster2}
//           onClick={() => {
//             setOpenPosterModal(true);
//             setSelectedPoster(posters.poster2);
//           }}
//         />
//         <Poster3
//           poster={posters.poster3}
//           onClick={() => {
//             setOpenPosterModal(true);
//             setSelectedPoster(posters.poster3);
//           }}
//         />
//         <Poster4
//           poster={posters.poster4}
//           onClick={() => {
//             setOpenPosterModal(true);
//             setSelectedPoster(posters.poster4);
//           }}
//         />
//         <Poster5
//           poster={posters.poster5}
//           onClick={() => {
//             setOpenPosterModal(true);
//             setSelectedPoster(posters.poster5);
//           }}
//         />
//         <BookingConsultation
//           onClick={() => setOpenBookingConsultationModal(true)}
//         />
//         <BoothChat onClick={() => setOpenChatModal(true)} />
//         <ButtonVideo onClick={() => setOpenVideoModal(true)} />
//         <BoothCS />
//       </div>
//     </>
//   );
// };

// export default VirtualBooth5;

import React from "react";

export const VirtualBooth5 = () => {
  return <div></div>;
};
