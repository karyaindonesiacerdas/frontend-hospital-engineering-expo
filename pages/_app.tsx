import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import { appWithTranslation } from "next-i18next";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
