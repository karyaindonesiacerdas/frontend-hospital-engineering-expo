import axios from "axios";
import { useQuery } from "react-query";

type Conversation = {
  _id: string;
  members: number[];
};

export const useConversation = ({ id }: { id: number }) => {
  return useQuery<Conversation[], Error>(
    // ["consultations", cookies.access_token],
    ["conversations"],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_CHAT_API}/conversations/${id}`)
        .then((res) => res.data),
    { enabled: Boolean(id), retry: 2 }
  );
};
