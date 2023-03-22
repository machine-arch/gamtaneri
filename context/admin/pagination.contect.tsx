import { FC, PropsWithChildren } from 'react';
import { createContext, Context, useState } from 'react';

export const PaginationContext: Context<any> =
  createContext<Context<any>>(null);

export const PaginationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [paginationButtons, setPaginationButtons] = useState<HTMLElement[]>([]);
  const [paginationFrom, setPaginationFrom] = useState<number>(0);
  const [paginationCount, setPaginationCount] = useState<number>(0);
  return (
    <PaginationContext.Provider
      value={{
        paginationButtons,
        setPaginationButtons,
        paginationFrom,
        setPaginationFrom,
        paginationCount,
        setPaginationCount,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
