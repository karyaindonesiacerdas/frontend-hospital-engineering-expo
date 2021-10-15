import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";

export type View = {
  id: number;
  exhibitor_id: number;
  visitor: {
    name: string;
    institution_name: string;
    email: string;
    mobile: string;
    allow_share_info: number;
    province: string;
  };
  exhibitor: {
    id: number;
    company_name: string;
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

type Props = {
  page: number;
  limit?: number;
};

export const useViews = ({ page, limit = 50 }: Props) => {
  const cookies = parseCookies();

  return useQuery<Response, Error>(
    ["views", page],
    () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/list-visitor-views?page=${page}&limit=${limit}`,
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
