import { Context, createContext, FC, PropsWithChildren, useState } from "react";
import { UserInterface } from "../../config/interfaces/app.interfaces";
export interface authContextInterface {
  user: UserInterface;
  setUser: Function;
}

export const authContext = createContext<authContextInterface | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);
  const value: authContextInterface = { user, setUser };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
