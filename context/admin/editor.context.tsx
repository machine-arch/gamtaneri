import { Context, createContext, FC, PropsWithChildren, useState } from "react";

export interface editorContextInterface {
  editorRefgeo: any;
  editorRefeng: any;
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
