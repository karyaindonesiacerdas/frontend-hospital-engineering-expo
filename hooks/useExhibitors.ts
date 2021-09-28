import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { Exhibitor } from "types";

type Props = {
  showAll?: boolean;
};

export const useExhibitors = ({ showAll = true }: Props) => {
  const cookies = parseCookies();

  return useQuery<Exhibitor[], Error>(
    ["exhibitors", showAll ? "all" : "confirmed"],
    () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/exhibitor?show_package=${
            showAll ? 0 : 1
          }`,
          {
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        )
        .then((res) => res.data.data),
    { staleTime: 1000 * 60 * 2 }
  );
};
