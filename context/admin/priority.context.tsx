import {
  Context,
  createContext,
  FC,
  PropsWithChildren,
  useReducer,
} from 'react';

export interface priorityContextInterface {
  isUserTop: boolean | any;
  isProjectTop: boolean | any;
}

export const priorityContex: Context<any> =
  createContext<priorityContextInterface | null>(null);

export const PriorityProvider: FC<PropsWithChildren> = ({ children }) => {
  const initIalState: priorityContextInterface = {
    isUserTop: false,
    isProjectTop: false,
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SET_USER_PRIORITY':
        return { ...state, isUserTop: action.payload };
      case 'SET_PROJECT_PRIORITY':
        return { ...state, isProjectTop: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initIalState);

  return (
    <priorityContex.Provider value={{ state, dispatch }}>
      {children}
    </priorityContex.Provider>
  );
};
