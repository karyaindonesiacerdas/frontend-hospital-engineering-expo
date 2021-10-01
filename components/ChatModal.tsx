import {
  Fragment,
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Transition, Dialog } from "@headlessui/react";

import { useAuth } from "@/contexts/auth.context";
import { useSocket } from "socket/socket.context";
import { useConversation } from "hooks/useConversation";
import newMessageSound from "./chats/NewMessageSound";
import { Search } from "./chats/Search";
import { ChatListItem } from "./chats/ChatListItem";
import { MessagesPanel } from "./chats/MessagesPanel";

type ChatModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type ChatProps = {
  conversationId: string;
  chatBuddy: number;
  avatar: string;
  name: string;
};

export const ChatModal = ({ open, setOpen }: ChatModalProps) => {
  const cancelButtonRef = useRef(null);
  const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
  const [newMessagesFrom, setNewMessagesFrom] = useState<number[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<any>();
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const { socket, setIsNewMessageCome } = useSocket();
  const { data } = useConversation({ id: user?.id });

  const chatBuddies = data?.map((data) => {
    return {
      conversationId: data._id,
      chatBuddy: data.members.find((member) => member !== user?.id)!,
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      name: "Anonymous",
    };
  });

  useEffect(() => {
    if (user && socket) {
      socket.emit("addUser", user.id);
      socket.on("getUsers", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [socket, user]);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      newMessageSound("anonymous");
      setNewMessagesFrom((prev) => [...prev, data.senderId]);
    });
  }, [socket]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={(v) => {
          setOpen(v);
          setIsNewMessageCome(false);
          setSelectedChat(null);
          if (selectedChat) {
            setNewMessagesFrom((prev) =>
              prev.filter((id) => id !== selectedChat.chatBuddy)
            );
          }
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg h-[600px] w-full sm:p-6 modal-bg ">
              {/* ### Chat ### */}
              <div className="flex w-full h-full bg-white rounded-md overflow-hidden">
                {!selectedChat ? (
                  <div className="w-full h-full">
                    {/* <!-- Chat list header --> */}
                    <div className="py-2 px-4 bg-primary-500 border-b border-gray-200 h-12 flex justify-between items-center">
                      <h3 className="text-xl font-medium text-white uppercase">
                        HEF 2021 Chat
                      </h3>
                      <button
                        onClick={() => setOpen(false)}
                        className="p-1 hover:bg-primary-600 rounded-md text-white"
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

                    {/* <!-- Search --> */}
                    <Search
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />

                    {/* <!-- Chat list --> */}
                    <ul className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
                      {chatBuddies?.map((buddy) => (
                        <ChatListItem
                          key={buddy.conversationId}
                          chat={{
                            conversationId: buddy.conversationId,
                            avatar: buddy.avatar,
                            chatBuddy: buddy.chatBuddy,
                            name: buddy.name,
                          }}
                          selectedChat={selectedChat}
                          setSelectedChat={setSelectedChat}
                          onlineUsers={onlineUsers}
                          totalNewMessage={
                            newMessagesFrom.filter(
                              (id) => id === buddy.chatBuddy
                            ).length
                          }
                          setNewMessagesFrom={setNewMessagesFrom}
                          searchTerm={searchTerm}
                        />
                      ))}
                    </ul>
                  </div>
                ) : (
                  // <div></div>
                  <MessagesPanel
                    setOpen={setOpen}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    onlineUsers={onlineUsers}
                    socket={socket}
                    setNewMessagesFrom={setNewMessagesFrom}
                  />
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    // <div></div>
  );
};
