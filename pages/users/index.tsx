import { useContext, useState, useEffect } from "react";
import { FormPropsInterface } from "../../config/interfaces/app.interfaces";
import { localeContext } from "../../context/locale-context";
import { modalContext } from "../../context/modal-context";
import { pagesContext } from "../../context/pages-context";
import Header from "../../components/front/header/header.component";
import Modal from "../../components/modal/modal.component";
import AllUsers from "../../components/front/userssection/all-users.component";

const OurUsers = (props: any) => {
  const modalContextObject: any = useContext(modalContext);
  const localeContextObject: any = useContext(localeContext);
  const pagesContextObject: any = useContext(pagesContext);
  const { isModalOpen, modalKey, modalTitle, setIsModalOpen, setModalKey } =
    modalContextObject;
  const { loader, sendContactResponse, sendMail, ModalCloseHendler } =
    pagesContextObject;
  const [localeKey, setLocaleKey] = useState("");
  const [dictionary, setDictionary] = useState(null);
  useEffect(() => {
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, [localeContextObject]);

  const formInputs = [
    {
      id: "001",
      type: "text",
      name: "fullname",
      className: "form-input",
      placeholder: dictionary
        ? dictionary[localeKey]["fullName"]
        : "სახელი და გვარი",
      needCommonParent: true,
    },
    {
      id: "002",
      type: "text",
      name: "phone",
      className: "form-input",
      placeholder: dictionary ? dictionary[localeKey]["phone"] : "ტელეფონი",
      needCommonParent: true,
    },
    {
      id: "003",
      type: "email",
      name: "email",
      className: "form-input",
      placeholder: dictionary ? dictionary[localeKey]["email"] : "ელ.ფოსტა",
      needCommonParent: false,
    },
  ];
  const formTextareas = [
    {
      textareaClass: "form_textarea",
      textareaName: "message",
      textareaPlaceholder: dictionary
        ? dictionary[localeKey]["message"]
        : "შეტყობინება",
    },
  ];
  const modalHeader = {
    headerClassname: "modal_header",
    headerLogoClassname: "modal_header_logo",
    headerCloseImageSrc: "/images/close.svg",
    colosHendler: ModalCloseHendler,
  };
  const formProps: FormPropsInterface = {
    formClassName: "form",
    inputs: formInputs,
    inputsCommonParentClass: "inputs_common_parent",
    needTextareas: true,
    textareas: formTextareas,
    needButton: true,
    loader: loader,
    buttonClass: "form_button",
    buttonText: dictionary ? dictionary[localeKey]["send"] : "გაგზავნა",
    ButtoncallBack: null,
    submit: sendMail,
  };
  const confirmProps = {
    acceptHendler: null,
    cancelHendler: ModalCloseHendler,
    question: dictionary
      ? dictionary[localeKey][sendContactResponse]
      : "თქვენი შეტყობინება წარმატებით გაიგზავნა",
    conteinerClass: "modal_dialogs_conteiner",
    name: "send mail",
  };
  const modalProps = {
    modal_title: modalTitle,
    FormProps: formProps,
    confirmProps: confirmProps,
    isOpen: isModalOpen,
    key: modalKey,
    currentproject: [],
    needHeader: true,
    ...modalHeader,
    needHeaderTitle: true,
    modal_item_conteiner_class:
      modalKey === "FORM"
        ? "contact_modal_item_conteiner"
        : modalKey === "GALLERY"
        ? "modal_item_conteiner"
        : "modal_item_conteiner",
  };
  return (
    <div>
      <Modal modalprops={modalProps} />
      <section className="AllUsers_header_section">
        <Header setismodalopen={setIsModalOpen} setModalKey={setModalKey} />
      </section>
      <section className="All_users_section">
        <AllUsers users={props.users} />
      </section>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const users = await fetch("http://localhost:3000/api/client/users/getall", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data);

  return {
    props: {
      users: users.resource,
    },
  };
}

export default OurUsers;
