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
    allow_share_info: number;
    province: string;
  };
};

type Response = {
  data: View[];
  from: number | null;
  to: number | null;
  total: number | null;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export const useViews = ({ page }: { page: number }) => {
  const cookies = parseCookies();

  return useQuery<Response, Error>(
    ["views", page],
    () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/list-visitor-views?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        )
        .then((res) => res.data.data),
    { enabled: Boolean(cookies.access_token) }
  );
};
