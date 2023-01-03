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

export function ModalCloseHendler(param: any) {
  param(false);
}

export const httpRequest = async (
  url: string,
  method: string,
  body?: any,
  headers?: any
) => {
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: body,
  })
    .then((res) => res.json())
    .then((data) => data);
  return response;
};

export const imageLoaderProp = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
