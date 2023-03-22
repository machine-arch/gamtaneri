import {
  Context,
  createContext,
  FC,
  PropsWithChildren,
  useReducer,
} from 'react';

export interface projectsContextInterface {
  projectNameGeo: string | any;
  projectNameEng: string | any;
}

export const projectsContext: Context<any> =
  createContext<projectsContextInterface | null>(null);

export const ProjectsProvaider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <projectsContext.Provider value={projectsContext}>
      {children}
    </projectsContext.Provider>
  );
};
