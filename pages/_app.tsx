import "../styles/reset.css";
import "../styles/global.css";
import type { AppProps } from "next/app";
import { ScrollProvider } from "./../context/scroll-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ScrollProvider>
      <Component {...pageProps} />;
    </ScrollProvider>
  );
}

export default MyApp;
