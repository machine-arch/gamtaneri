import { createContext, RefObject, Context } from "react";

export interface scrollContextInterface {
  aboutUs: RefObject<HTMLElement>;
  projectsSection: RefObject<HTMLElement>;
  userSection: RefObject<HTMLElement>;
  mainSection: RefObject<HTMLElement>;
}

export const ScrollContext: Context<any> =
  createContext<scrollContextInterface | null>(null);

export const ScrollProvider = ({ children }: any) => {
  return (
    <ScrollContext.Provider value={ScrollContext}>
      {children}
    </ScrollContext.Provider>
  );
};
