import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";

export type Counter = {
  id: number;
  exhibitor: {
    id: number;
    company_name: string;
  };
};

export type View = {
  id: number;
  name: string;
  institution_name: string;
  counters: Counter[];
};

type Response = {
  data: View[];
  from: number | null;
  to: number | null;
  total: number | null;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export const useVisitorViews = ({ page }: { page: number }) => {
  const cookies = parseCookies();

  return useQuery<Response, Error>(
    ["visitor-views", page],
    () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/list-visitor-booth-views?page=${page}`,
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
