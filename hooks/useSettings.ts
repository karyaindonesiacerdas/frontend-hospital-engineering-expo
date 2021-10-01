import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";

export type Settings = {
  id: number;
  youtube_link: string;
  zoom_link: string;
  zoom_business_link: string;
  webinar_link: string;
  ads1_link: string;
  ads2_link: string;
  is_chat: string;
};

export const useSettings = () => {
  const cookies = parseCookies();

  return useQuery<Settings, Error>(
    ["settings"],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/setting`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
        .then((res) => res.data.data),
    { enabled: Boolean(cookies.access_token) }
  );
};
