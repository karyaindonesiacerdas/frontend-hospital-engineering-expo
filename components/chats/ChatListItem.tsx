import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { useUserDetail } from "hooks/useUserDetail";
import { ChatProps } from "../ChatModal";
import { useMessages } from "hooks/useMessages";
import { useAuth } from "@/contexts/auth.context";

type ChatListItemProps = {
  chat: ChatProps;
  selectedChat: ChatProps | null;
  setSelectedChat: Dispatch<SetStateAction<ChatProps | null>>;
  onlineUsers: any[];
  totalNewMessage: number;
  setNewMessagesFrom: Dispatch<SetStateAction<number[]>>;
  searchTerm: string;
};

export const ChatListItem = ({
  chat,
  selectedChat,
  setSelectedChat,
  onlineUsers,
  totalNewMessage,
  setNewMessagesFrom,
  searchTerm,
}: ChatListItemProps) => {
  const { user } = useAuth();
  const { data, isLoading } = useUserDetail(chat.chatBuddy);

  // New
  const { data: messages } = useMessages({
    conversationId: chat?.conversationId,
  });

  const isOnline = onlineUsers?.find((u) => u.userId === chat?.chatBuddy);
  console.log({ chat });

  // New
  if (user?.role === "exhibitor" && chat.chatBuddy !== 2 && !messages?.length)
    return null;

  if (
    !data?.name.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
    !data?.company_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
    !data?.institution_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  )
    return null;

  if (isLoading) {
    return <div className="bg-gray-200 w-full h-16 animate-pulse p-2"></div>;
  }

  // console.log({ data });

  return (
    <li
      className={`group cursor-pointer`}
      onClick={() =>
        setNewMessagesFrom((prev) =>
          prev.filter((id) => id !== selectedChat?.chatBuddy)
        )
      }
    >
      <div
        className={`flex items-start space-x-3 px-4 group-hover:bg-gray-100 py-4 relative`}
        onClick={() => {
          setSelectedChat(chat);
        }}
      >
        <Image
          width={35}
          height={35}
          objectFit="cover"
          className="hidden sm:block rounded-full"
          src={
            data?.img_profile && data?.img_profile !== "undefined"
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/profiles/${data?.img_profile}`
              : `https://ui-avatars.com/api/?name=${data?.name}`
          }
          alt={data?.name}
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium -mb-1">{data?.name}</h3>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">
            {data?.role === "exhibitor"
              ? data?.company_name
              : data?.institution_name}
          </p>
        </div>
        {totalNewMessage > 0 && (
          <span className="text-xs bg-primary-600 text-white font-semibold px-2 py-1 rounded-full animate-pulse">
            {totalNewMessage}
          </span>
        )}
        {isOnline && (
          <div className="bg-green-500 h-3 w-3 rounded-full absolute border-2 border-white top-3 left-1 animate-pulse"></div>
        )}
      </div>
    </li>
  );
};
