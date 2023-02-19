import { FC, PropsWithChildren } from "react";
import { createContext, RefObject, Context } from "react";

export interface paginationContextInterface {
  pgButtonsRef: RefObject<HTMLElement>;
}

export const PaginationContext: Context<any> =
  createContext<paginationContextInterface | null>(null);

export const PaginationProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PaginationContext.Provider value={PaginationContext}>
      {children}
    </PaginationContext.Provider>
  );
};
