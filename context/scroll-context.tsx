import { createContext, LegacyRef, useRef, useState } from "react";

export const ScrollContext: any = createContext({
  mainSectionId: "",
  projectsSectionId: "",
  userSectionId: "",
});

export const ScrollProvider = ({ children }: any) => {
  const mainSection: LegacyRef<HTMLDivElement> = useRef(null);
  const projectsSection: LegacyRef<HTMLDivElement> = useRef(null);
  const userSection: LegacyRef<HTMLDivElement> = useRef(null);

  return (
    <ScrollContext.Provider
      value={{
        mainSectionId: mainSection.current?.getAttribute("id"),
        projectsSectionId: projectsSection.current?.getAttribute("id"),
        userSectionId: userSection.current?.getAttribute("id"),
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
