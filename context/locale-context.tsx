import { Context, createContext, FC, useEffect, useState } from "react";
import nookies from "nookies";

export const localeContext: any = createContext<Context<{}>>(null);

export const LocaleProvider: FC = ({ children }: any) => {
  const [dictionary, setDictionary] = useState(null);
  const [localeKey, setLocaleKey] = useState("");
  useEffect(() => {
    /**
     * @description this function is used to get to fetch dictionary object from locale json file
     * @returns
     */
    const fetchLocale = async () => {
      const Data = await fetch("locale/locale.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      return Data;
    };
    fetchLocale().then((data) => {
      setDictionary(data);
    });

    /**
     * @description  set locale key from cookies if it exists, if not set default locale in cookies
     */
    if (
      !nookies.get(null, "locale") ||
      nookies.get(null, "locale").locale !== ""
    ) {
      setLocaleKey(nookies.get(null, "locale").locale);
    } else {
      nookies.set(null, "locale", "ka", {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
      setLocaleKey("ka");
    }
  }, []);
  return (
    <localeContext.Provider value={{ localeKey, dictionary, setLocaleKey }}>
      {children}
    </localeContext.Provider>
  );
};
