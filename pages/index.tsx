import type { NextPage } from "next";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Index.module.css";
import Header from "../components/front/header/header.component";
import Mainsection from "../components/front/mainsection/mainsection.component";
import UsersSection from "../components/front/userssection/userssection.component";
import CompletedProjects from "../components/front/completedprojects/completed-projects.component";
import AboutUs from "../components/front/aboutus/about-us.component";
import Footer from "../components/front/footer/footer.component";
import { localeContext } from "../context/locale-context";
import Modal from "../components/modal/modal.component";
import { FormPropsInterface } from "../config/interfaces/app.interfaces";

const Home: NextPage = (props) => {
  const [localeKey, setLocaleKey] = useState("");
  const [dictionary, setDictionary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState("");
  const localeContextObject: any = useContext(localeContext);
  useEffect(() => {
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, [localeContextObject]);

  const footerProps = {
    dyctionary: dictionary,
    key: localeKey,
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
  const formProps: FormPropsInterface = {
    formClassName: "form",
    inputs: formInputs,
    inputsCommonParentClass: "inputs_common_parent",
    needTextareas: true,
    textareas: formTextareas,
    needButton: true,
    buttonClass: "form_button",
    buttonText: dictionary ? dictionary[localeKey]["send"] : "გაგზავნა",
    ButtoncallBack: (e: SyntheticEvent) => {
      e.preventDefault();
      console.log("clicked");
    },
  };
  const modalProps = {
    modal_title: "ჩვენს შესახებ",
    FormProps: formProps,
    isOpen: isModalOpen,
    key: modalKey,
  };
  return (
    <div className="conteiner">
      <Modal modalprops={modalProps} />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <Header setismodalopen={setIsModalOpen} setModalKey={setModalKey} />
      </div>
      <section className={styles.main_section}>
        <Mainsection />
      </section>
      <section className={styles.users_section}>
        <div>
          <UsersSection />
        </div>
      </section>
      <section className={styles.projects_section}>
        <CompletedProjects />
      </section>
      <section className={styles.about_us_section}>
        <AboutUs />
      </section>
      <section className={styles.footer_section}>
        <Footer
          dictionary={footerProps.dyctionary}
          localeKey={footerProps.key}
        />
      </section>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
    },
  };
}

export default Home;
