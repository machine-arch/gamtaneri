import { AsyncHook } from "async_hooks";
import nookies from "nookies";

export const switchLanguage = (setLocale: any) => {
  const locale = nookies.get({}).locale;
  if (locale === "ka") {
    setLocale("en");
    nookies.set(null, "locale", "en", {
      path: "/",
    });
  } else {
    setLocale("ka");
    nookies.set(null, "locale", "ka", {
      path: "/",
    });
  }
};
