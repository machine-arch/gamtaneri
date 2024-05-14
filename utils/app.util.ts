import nookies from 'nookies';
import { SyntheticEvent } from 'react';

export const switchLanguage = (setLocale: any) => {
  const locale = nookies.get({}).locale;
  if (locale === 'ka') {
    setLocale('en');
    nookies.set(null, 'locale', 'en');
  } else {
    setLocale('ka');
    nookies.set(null, 'locale', 'ka');
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
  console.log('url', url);
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

export const createDate = (date: string) => {
  const newDate = new Date(date);
  return `${newDate.getDate().toString().padStart(2, '0')}.${(
    newDate.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${newDate.getFullYear()}`;
};

export const scrollTo = (ref: any | undefined) => {
  return ref
    ? window.scrollTo({
        top: ref?.current?.offsetTop - 100,
        behavior: 'smooth',
      })
    : null;
};
