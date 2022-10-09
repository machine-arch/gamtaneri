import { Context, createContext, useEffect, useState } from "react";
export interface localeContextInterface {
  locale: Object;
}
export const localeContext: Context<any> =
  createContext<localeContextInterface>(null);

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(null);
  useEffect(() => {
    fetch("locale/locale.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setLocale(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <localeContext.Provider value={locale}>{children}</localeContext.Provider>
  );
};
