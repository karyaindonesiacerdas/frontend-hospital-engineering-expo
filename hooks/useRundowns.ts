import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";

export type RundownDetail = {
  id: number;
  date: string;
  time: string;
  title: string;
  subtitle: string;
  speakers: string;
  position: string;
  embedd_link: string;
  status: number;
};

export const useRundowns = () => {
  const cookies = parseCookies();

  return useQuery<RundownDetail[], Error>(
    // ["rundowns", cookies.access_token],
    ["rundowns"],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/rundown`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
        .then((res) => res.data.data),
    { enabled: Boolean(cookies.access_token) }
  );
};
