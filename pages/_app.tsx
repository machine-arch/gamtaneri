import "../styles/reset.css";
import "../styles/global.css";
import type { AppProps } from "next/app";
import { ScrollProvider } from "./../context/scroll-context";
import { LocaleProvider } from "./../context/locale-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocaleProvider>
      <ScrollProvider>
        <Component {...pageProps} />
      </ScrollProvider>
    </LocaleProvider>
  );
}

export default MyApp;
