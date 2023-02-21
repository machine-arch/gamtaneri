import { FC, PropsWithChildren } from 'react';
import { createContext, Context, useState } from 'react';

export const PaginationContext: Context<any> =
  createContext<Context<any>>(null);

export const PaginationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [paginationButtons, setPaginationButtons] = useState<HTMLElement[]>([]);
  return (
    <PaginationContext.Provider
      value={{ paginationButtons, setPaginationButtons }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
