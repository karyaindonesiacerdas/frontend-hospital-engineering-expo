import axios from "axios";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { ConsultationDetail } from "types";

export const useConsultations = () => {
  const cookies = parseCookies();

  return useQuery<ConsultationDetail[], Error>(
    ["consultations", cookies.access_token],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/consultation`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
        .then((res) => res.data.data),
    { enabled: Boolean(cookies.access_token) }
  );
};
