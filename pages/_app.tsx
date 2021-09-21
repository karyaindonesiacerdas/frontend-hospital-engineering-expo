import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "../contexts/auth.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
