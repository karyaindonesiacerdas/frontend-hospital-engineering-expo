import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";

type BoothStatistics = {
  id: string;
  company_name: string;
  total_visitors: number;
};

export const useBoothStatistics = () => {
  const cookies = parseCookies();

  return useQuery<BoothStatistics[], Error>(
    ["booth-statistics"],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/list-visitor-views`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
        .then((res) => res.data.data),
    { staleTime: 1000 * 60 * 1 }
  );
};
