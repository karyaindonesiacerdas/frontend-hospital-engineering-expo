import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import { appWithTranslation } from "next-i18next";
import { AuthProvider } from "../contexts/auth.context";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
