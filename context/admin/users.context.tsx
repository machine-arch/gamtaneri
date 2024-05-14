import {
  Context,
  createContext,
  FC,
  PropsWithChildren,
  useReducer,
} from 'react';

export interface usersContextInterface {
  userNameGeo: string | any;
  userNameEng: string | any;
  userDescriptionGeo: string | any;
  userDescriptionEng: string | any;
}

export const usersContext: Context<any> =
  createContext<usersContextInterface | null>(null);

export const UsersProvaider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <usersContext.Provider value={usersContext}>
      {children}
    </usersContext.Provider>
  );
};
