import {
  Context,
  createContext,
  FC,
  PropsWithChildren,
  useReducer,
} from 'react';

export interface mobileContextInterfae {
  isOpen: boolean | any;
}

export const mobileContext: Context<any> =
  createContext<mobileContextInterfae | null>(null);

export const MobileProvider: FC<PropsWithChildren> = ({ children }) => {
  const initIalState: mobileContextInterfae = {
    isOpen: false,
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SET_IS_OPEN':
        return { ...state, isOpen: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initIalState);

  return (
    <mobileContext.Provider value={{ state, dispatch }}>
      {children}
    </mobileContext.Provider>
  );
};
