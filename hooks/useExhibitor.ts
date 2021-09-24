import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { ExhibitorDetails } from "types";

export const useExhibitor = ({ id }: any) => {
  const cookies = parseCookies();

  return useQuery<ExhibitorDetails, Error>(
    ["exhibitor", id],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/exhibitor/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
        .then((res) => res.data.data),
    { enabled: Boolean(id), staleTime: 1000 * 60 * 5, retry: 2 }
  );
};
