import { Context, createContext, FC, PropsWithChildren } from "react";

export interface editorContextInterface {
  editorDateGeo: String;
  editorDataEng: string;
}

export const editorContext: Context<any> =
  createContext<editorContextInterface | null>(null);

export const EditorProvaider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <editorContext.Provider value={editorContext}>
      {children}
    </editorContext.Provider>
  );
};
