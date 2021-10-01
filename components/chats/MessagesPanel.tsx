import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";

import { ChatProps } from "../ChatModal";
import { ChatInput } from "./ChatInput";
import { ChatItem } from "./ChatItem";
import { ChatMessageHeader } from "./ChatMessageHeader";
import { useAuth } from "@/contexts/auth.context";
import { useUserDetail } from "hooks/useUserDetail";

type MessagesPanelProps = {
  selectedChat: ChatProps;
  setSelectedChat: Dispatch<SetStateAction<ChatProps | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onlineUsers: any[];
  socket?: Socket;
  setNewMessagesFrom: Dispatch<SetStateAction<number[]>>;
};

export const MessagesPanel = ({
  setSelectedChat,
  selectedChat,
  setOpen,
  onlineUsers,
  socket,
  setNewMessagesFrom,
}: MessagesPanelProps) => {
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>();

  const { user: me } = useAuth();
  const { data: user } = useUserDetail(selectedChat.chatBuddy);

  // Set Arrival Message when get message from socket
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        _id: data._id,
        sender: data.senderId,
        text: data.text,
        createdAt: data.createdAt,
      });
    });
  }, [socket]);

  // add arrival message to messages
  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.sender === selectedChat.chatBuddy &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, selectedChat.chatBuddy]);

  // Get Messages from DB
  useEffect(() => {
    const getMessages = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CHAT_API}/messages/${selectedChat.conversationId}`
      );

      if (!res.ok) {
        throw new Error("Chat Server is not active");
      }

      const data = await res.json();
      setMessages(data);
    };
    if (selectedChat?.conversationId) {
      try {
        getMessages();
      } catch (error) {
        toast.error("Chat server is not active");
      }
    }
  }, [selectedChat?.conversationId]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // messageEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative chat-bg w-full">
      {/* <!-- Chat Header --> */}
      {user && (
        <ChatMessageHeader
          setSelectedChat={setSelectedChat}
          name={user.name}
          img_profile={user.img_profile}
          info={
            user.role === "exhibitor"
              ? user.company_name
              : user.institution_name
          }
          setOpen={setOpen}
          onlineUsers={onlineUsers}
          buddyId={selectedChat.chatBuddy}
          setNewMessagesFrom={setNewMessagesFrom}
        />
      )}

      <div className="flex flex-col justify-between h-[503px]">
        {/* <!-- Chat Body --> */}
        <div className="overflow-auto">
          <ul className="px-4 py-4 w-full flex flex-col space-y-2 items-start">
            {messages?.map((message) => (
              <ChatItem
                key={message._id}
                message={message}
                own={me?.id === message.sender}
                senderName={user?.name}
              />
            ))}
            <div ref={messageEndRef} />
          </ul>
        </div>

        {/* <!-- Chat input --> */}
        <ChatInput
          conversationId={selectedChat?.conversationId}
          sender={me?.id}
          socket={socket}
          messages={messages}
          setMessages={setMessages}
          buddyId={selectedChat.chatBuddy}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </div>
  );
};
