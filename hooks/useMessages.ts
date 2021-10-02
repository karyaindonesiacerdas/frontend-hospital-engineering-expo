import axios from "axios";
import { useQuery } from "react-query";

type Message = {
  _id: string;
  conversationId: string;
  sender: number;
  text: string;
};

export const useMessages = ({ conversationId }: { conversationId: string }) => {
  return useQuery<Message[], Error>(
    // ["consultations", cookies.access_token],
    ["messages", conversationId],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_CHAT_API}/messages/${conversationId}`)
        .then((res) => res.data),
    { enabled: Boolean(conversationId), retry: 2 }
  );
};
