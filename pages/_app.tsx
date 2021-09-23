import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AuthProvider } from "../contexts/auth.context";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
