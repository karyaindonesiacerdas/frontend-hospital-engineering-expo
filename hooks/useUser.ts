import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";

export const useUser = () => {
  const cookies = parseCookies();

  return useQuery(
    ["user"],
    () =>
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        )
        .then((res) => res.data.data),

    { enabled: Boolean(cookies?.access_token), staleTime: Infinity }
  );
};
