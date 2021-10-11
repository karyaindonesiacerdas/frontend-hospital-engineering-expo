// user/detail/2
import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";

type UserDetail = {
  name: string;
  email: string;
  img_profile: string;
  institution_name: string | null;
  company_name: string | null;
  role: string;
  allow_share_info: number;
};

export const useUserDetail = (id: number) => {
  const cookies = parseCookies();

  return useQuery<UserDetail, Error>(
    ["user-detail", id],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
        .then((res) => res.data.data),

    {
      enabled: Boolean(cookies?.access_token) || Boolean(id),
      staleTime: Infinity,
    }
  );
};
