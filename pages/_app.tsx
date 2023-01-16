import "../styles/reset.css";
import "../styles/global.css";
import type { AppProps } from "next/app";
import { ScrollProvider } from "./../context/scroll-context";
import { LocaleProvider } from "./../context/locale-context";
import { AuthProvider } from "../context/admin/auth.context";
import { ModalProvaider } from "./../context/modal-context";
import { PagesProvaider } from "./../context/pages-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvaider>
      <AuthProvider>
        <LocaleProvider>
          <ScrollProvider>
            <PagesProvaider>
              <Component {...pageProps} />
            </PagesProvaider>
          </ScrollProvider>
        </LocaleProvider>
      </AuthProvider>
    </ModalProvaider>
  );
}

export default MyApp;
