import {
  Context,
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import nookies from "nookies";

export const modalContext: any = createContext<Context<any>>(null);

export const ModalProvaider: FC<any> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  useEffect(() => {}, []);
  return (
    <modalContext.Provider
      value={{
        isModalOpen,
        modalKey,
        modalTitle,
        setIsModalOpen,
        setModalKey,
        setModalTitle,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};
