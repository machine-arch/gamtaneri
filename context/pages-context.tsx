import {
  Context,
  createContext,
  FC,
  SyntheticEvent,
  useState,
  useContext,
} from "react";
import { httpRequest } from "../utils/app.util";
import { modalContext } from "./modal-context";

export const pagesContext: any = createContext<Context<any>>(null);

export const PagesProvaider: FC<any> = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [sendContactResponse, setSendContactResponse] = useState("");
  const [currentProject, setCurrentProject] = useState(null);
  const modalContextObject: any = useContext(modalContext);
  const { isModalOpen, setIsModalOpen, setModalKey, setModalTitle } =
    modalContextObject;

  /**
   * @description send mail to gamtaneri
   * @param e
   */
  const sendMail = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { fullname, phone, email, message } = Object.fromEntries(formData);
    const { validate_message } = form.elements as any;
    const fildNames = ["fullname", "phone", "email", "message"];
    let isValidForm = false;

    fildNames.map((fildName) => {
      form.elements[fildName].addEventListener("keydown", (e) => {
        e.target.classList.remove("required");
        validate_message.value = "";
      });

      if (form.elements[fildName].value === "") {
        form.elements[fildName].classList.add("required");
        validate_message.value = "გთხოვთ შეავსოთ ყველა ველი";
        isValidForm = false;
        return false;
      }

      if (
        form.elements["email"].value !== "" &&
        !form.elements["email"].value.includes("@") &&
        !form.elements["email"].value.includes(".")
      ) {
        form.elements["email"].classList.add("required");
        validate_message.value = "გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა";
        isValidForm = false;
        return false;
      }

      if (
        form.elements["phone"].value !== "" &&
        form.elements["phone"].value.length < 9
      ) {
        form.elements["phone"].classList.add("required");
        validate_message.value = "ტელეფონის ნომერი შედგება 9 ციფრისგან";
        isValidForm = false;
        return false;
      }
      form.elements[fildName].classList.remove("required");
      isValidForm = true;
    });

    if (isValidForm) {
      const data = {
          fullname,
          phone,
          email,
          message,
        },
        url = "/api/admin/contacts/send",
        method = "POST",
        headers = {
          "Content-Type": "application/json",
        };

      setLoader(true);
      const response = await httpRequest(
        url,
        method,
        JSON.stringify(data),
        headers
      );
      if (response.status === 200) {
        setLoader(false);
        setSendContactResponse("successfully_sent");
        !isModalOpen ? setIsModalOpen(true) : null;
        setModalKey("MESSAGE");
      } else {
        setLoader(false);
        setSendContactResponse("failed_to_send");
        !isModalOpen ? setIsModalOpen(true) : null;
        setModalKey("MESSAGE");
      }
    }
  };

  const ModalCloseHendler = () => {
    setIsModalOpen(false);
    setModalTitle("");
  };
  return (
    <pagesContext.Provider
      value={{
        loader,
        sendContactResponse,
        currentProject,
        setCurrentProject,
        setLoader,
        setSendContactResponse,
        sendMail,
        ModalCloseHendler,
      }}
    >
      {children}
    </pagesContext.Provider>
  );
};
