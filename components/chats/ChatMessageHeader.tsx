import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { ChatProps } from "../ChatModal";

type MessageHeaderProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  info: string | null;
  img_profile: string;
  setSelectedChat: Dispatch<SetStateAction<ChatProps | null>>;
  onlineUsers: any[];
  buddyId: number;
  setNewMessagesFrom: Dispatch<SetStateAction<number[]>>;
};

export const ChatMessageHeader = ({
  setOpen,
  name,
  info,
  img_profile,
  setSelectedChat,
  onlineUsers,
  buddyId,
  setNewMessagesFrom,
}: MessageHeaderProps) => {
  const isOnline = onlineUsers?.find((u) => u.userId === buddyId);

  return (
    <div className="py-2 px-4 border-b border-gray-200 h-12 flex justify-between items-center bg-white">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => {
            setSelectedChat(null);
            setNewMessagesFrom((prev) => prev.filter((id) => id !== buddyId));
          }}
          className="mr-2 p-1 hover:bg-gray-100 rounded-md"
        >
          <svg
            className="w-7 h-7"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.25 6.75L4.75 12L10.25 17.25"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19.25 12H5"
            ></path>
          </svg>
        </button>
        <div className="relative flex items-center">
          <Image
            width={34}
            height={34}
            objectFit="cover"
            className="h-8 w-8 rounded-full"
            src={
              img_profile
                ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/profiles/${img_profile}`
                : `https://ui-avatars.com/api/?name=${name}`
            }
            alt={name}
          />
          {isOnline && (
            <div className="bg-green-500 h-3 w-3 rounded-full absolute border-2 border-white top-0 -left-0.5 animate-pulse"></div>
          )}
        </div>
        <h3 className="text-lg sm:text-xl font-medium text-gray-600 mr-20">
          {name}
        </h3>
      </div>
      <button
        onClick={() => setOpen(false)}
        className="p-1 hover:bg-gray-100 rounded-md"
      >
        <svg
          className="w-7 h-7"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17.25 6.75L6.75 17.25"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6.75 6.75L17.25 17.25"
          />
        </svg>
        <span className="sr-only">Close Modal</span>
      </button>
    </div>
  );
};
