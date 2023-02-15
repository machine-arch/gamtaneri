import {
  Context,
  createContext,
  FC,
  PropsWithChildren,
  useReducer,
} from "react";

export const dataContext: Context<any> = createContext<Context<any>>(null);

export const DataProvaider: FC<PropsWithChildren> = ({ children }) => {
  const initialState = {
    isDispached: false,
    projects: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PROJECTS":
        return {
          ...state,
          projects: [...state.projects, ...action.payload],
          isDispached: true,
        };
      case "SET_PROJECTS_ONLOAD":
        return {
          ...state,
          projects: [...action.payload],
        };
     

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <dataContext.Provider value={{ state, dispatch }}>
      {children}
    </dataContext.Provider>
  );
};
