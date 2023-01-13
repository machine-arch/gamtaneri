import type { NextPage } from "next";
import {
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
  createRef,
  RefObject,
} from "react";
import Head from "next/head";
import styles from "../styles/Index.module.css";
import Header from "../components/front/header/header.component";
import Mainsection from "../components/front/mainsection/mainsection.component";
import UsersSection from "../components/front/userssection/userssection.component";
import CompletedProjects from "../components/front/completedprojects/completed-projects.component";
import AboutUs from "../components/front/aboutus/about-us.component";
import Footer from "../components/front/footer/footer.component";
import { localeContext } from "../context/locale-context";
import { modalContext } from "../context/modal-context";
import Modal from "../components/modal/modal.component";
import { FormPropsInterface } from "../config/interfaces/app.interfaces";
import { httpRequest } from "../utils/app.util";

const Home: NextPage = (props: any) => {
  const [localeKey, setLocaleKey] = useState("");
  const [dictionary, setDictionary] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [loader, setLoader] = useState(false);
  const [sendContactResponse, setSendContactResponse] = useState("");
  const localeContextObject: any = useContext(localeContext);
  const modalContextObject: any = useContext(modalContext);
  const {
    isModalOpen,
    modalKey,
    modalTitle,
    setIsModalOpen,
    setModalKey,
    setModalTitle,
  } = modalContextObject;
  useEffect(() => {
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, [localeContextObject]);

  const ModalCloseHendler = () => {
    setIsModalOpen(false);
    setModalTitle("");
  };
  const footerProps = {
    dyctionary: dictionary,
    key: localeKey,
  };

  /**
   * @description send mail to admin
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
    currentproject: currentProject,
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
    <div className="conteiner">
      <Modal modalprops={modalProps} />
      <Head>
        <title>გამტანერი</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <Header setismodalopen={setIsModalOpen} setModalKey={setModalKey} />
      </div>
      <section className={styles.main_section}>
        <Mainsection
          setismodalopen={setIsModalOpen}
          setModalKey={setModalKey}
        />
      </section>
      <section className={styles.users_section}>
        <CompletedProjects
          setismodalopen={setIsModalOpen}
          setModalKey={setModalKey}
          setcurrentproject={setCurrentProject}
          setModalTitle={setModalTitle}
          projects={props.projects}
        />
      </section>
      <section className={styles.projects_section}>
        <div>
          <UsersSection users={props.ourUsers} />
        </div>
      </section>
      <section className={styles.about_us_section}>
        <AboutUs data={props.aboutus} />
      </section>
      <section className={styles.footer_section}>
        <Footer
          dictionary={footerProps.dyctionary}
          localeKey={footerProps.key}
          contacts={props.contacts}
          sendMail={sendMail}
          formLoader={loader}
        />
      </section>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const projects = await fetch(
    "http://gamtaneri.ge/api/client/projects/getall",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);
  const ourUsers = await fetch("http://gamtaneri.ge/api/client/users/getall", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data);

  const contacts = await fetch("http://gamtaneri.ge//api/client/contacts/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data);

  const aboutus = await fetch("http://gamtaneri.ge/api/client/aboutus/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data);

  return {
    props: {
      projects: projects.resource,
      ourUsers: ourUsers.resource,
      contacts: contacts.resource,
      aboutus: aboutus.resource,
    },
  };
}

export default Home;
