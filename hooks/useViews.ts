import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";

export type View = {
  id: number;
  visitor: {
    name: string;
    institution_name: string;
    email: string;
    mobile: string;
  };
};

export const useViews = () => {
  const cookies = parseCookies();

  return useQuery<View[], Error>(
    ["views"],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/list-visitor-views`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
        .then((res) => res.data.data),
    { enabled: Boolean(cookies.access_token) }
  );
};
