/* eslint-disable @next/next/no-img-element */
import { useSocket } from "socket/socket.context";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  openChatModal?: boolean;
};

export const ChatButton = ({ onClick, openChatModal }: Props) => {
  const { isNewMessageCome, setIsNewMessageCome } = useSocket();

  return (
    <div className={`relative ${isNewMessageCome ? "animate-bounce" : ""}`}>
      <button
        onClick={(e) => {
          if (!openChatModal) {
            setIsNewMessageCome(false);
          }
          onClick && onClick(e);
        }}
        className={`bg-white bg-opacity-30 hover:bg-primary-50 transition-all duration-200 p-1.5 rounded-full shadow-2xl backdrop-filter backdrop-blur-lg `}
      >
        <img className="w-16 h-1w-16" src="/chat-icon.png" alt="Chat Icon" />
      </button>

      {/* New Message Indicator */}
      {isNewMessageCome && (
        <div className="bg-green-500 h-5 w-5 rounded-full absolute border-2 border-white top-0 right-0 animate-pulse"></div>
      )}
    </div>
  );
};
