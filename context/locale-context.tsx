import {
  Context,
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import nookies from "nookies";

export const localeContext: any = createContext<Context<{}>>(null);

export const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dictionary, setDictionary] = useState(null);
  const [localeKey, setLocaleKey] = useState("");
  useEffect(() => {
    /**
     * @description this function is used to get to fetch dictionary object from locale json file
     * @returns
     */
    fetch("locale/locale.json", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDictionary(data);
      });

    /**
     * @description  set locale key from cookies if it exists, if not set default locale in cookies
     */
    if (
      !nookies.get(null, "locale") ||
      nookies.get(null, "locale").locale !== ""
    ) {
      nookies.set(null, "locale", "ka", {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
      setLocaleKey("ka");
    } else {
      setLocaleKey(nookies.get(null, "locale").locale);
    }
  }, []);
  return (
    <localeContext.Provider value={{ localeKey, dictionary, setLocaleKey }}>
      {children}
    </localeContext.Provider>
  );
};
