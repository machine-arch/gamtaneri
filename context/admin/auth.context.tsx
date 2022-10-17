import { Context, createContext, FC, PropsWithChildren, useState } from "react";

export const authContext: any = createContext<Context<{}>>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};
