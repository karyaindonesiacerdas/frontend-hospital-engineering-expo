import { format } from "timeago.js";

type ChatItemProps = {
  senderName?: string;
  message: {
    _id: string;
    conversationId: string;
    sender: number;
    text: string;
    createdAt: string;
  };
  own: boolean;
};

export const ChatItem = ({ message, senderName, own }: ChatItemProps) => {
  return (
    <li
      className={`group cursor-pointer max-w-[95%] sm:max-w-[60%] ${
        own ? "self-end" : ""
      }`}
    >
      <div
        className={`flex-1 space-y-0.5 rounded-md shadow px-3 py-2 ${
          own ? "bg-primary-50" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between space-x-6">
          <h3 className="text-sm font-medium">{own ? "Me" : senderName}</h3>
          <p className="text-sm text-gray-500">{format(message.createdAt)}</p>
        </div>
        <p className="text-sm text-gray-700">{message.text}</p>
      </div>
    </li>
  );
};
