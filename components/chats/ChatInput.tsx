import {
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";
import TextareaAutosize from "react-textarea-autosize";

type Inputs = {
  text: string;
};

type ChatInputProps = {
  conversationId: string;
  sender: number;
  socket?: Socket;
  messages: any[];
  setMessages: Dispatch<SetStateAction<any[]>>;
  buddyId: number;
  scrollToBottom: () => void;
};

export const ChatInput = ({
  conversationId,
  sender,
  messages,
  setMessages,
  socket,
  buddyId,
  scrollToBottom,
}: ChatInputProps) => {
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>();

  useEffect(() => {
    scrollToBottom();
    setFocus("text");
  }, [setFocus, scrollToBottom]);

  const onSubmit: SubmitHandler<Inputs> = async ({ text }) => {
    if (!conversationId || !sender || !text) return;

    const data = {
      conversationId,
      sender,
      text,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CHAT_API}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Error when sending a message");
      }

      const json = await res.json();

      socket?.emit("sendMessage", {
        _id: json._id,
        senderId: json.sender,
        receiverId: buddyId,
        text: json.text,
        cretedAt: json.createdAt,
      });

      setMessages([...messages, json]);

      reset();
    } catch (error) {
      toast.error("Chat server is not active");
    }
  };

  const onEnterPress: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="chat-form"
      className="w-full px-4 py-2 border-t border-gray-200 bg-gray-200"
    >
      <div className="flex space-x-2">
        <div className="flex-1">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <div className="w-full">
            <TextareaAutosize
              className="w-full block px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm max-h-32 overflow-y-auto"
              style={{ resize: "none" }}
              onKeyDown={onEnterPress}
              {...register("text")}
            />
          </div>
        </div>

        <div className="flex space-x-1 items-end pb-0.5">
          <button
            type="submit"
            className="text-white p-1.5 rounded-full bg-primary-500 border border-gray-300 shadow flex items-center
                            justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 rotate-45"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            <span className="sr-only">Send</span>
          </button>
        </div>
      </div>
    </form>
  );
};
