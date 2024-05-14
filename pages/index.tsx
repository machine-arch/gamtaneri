import type { NextPage } from 'next';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Index.module.css';
import Header from '../components/front/header/header.component';
import Mainsection from '../components/front/mainsection/mainsection.component';
import UsersSection from '../components/front/userssection/userssection.component';
import CompletedProjects from '../components/front/completedprojects/completed-projects.component';
import AboutUs from '../components/front/aboutus/about-us.component';
import Footer from '../components/front/footer/footer.component';
import { localeContext } from '../context/locale-context';
import { modalContext } from '../context/modal-context';
import Modal from '../components/modal/modal.component';
import { FormPropsInterface } from '../config/interfaces/app.interfaces';
import { pagesContext } from '../context/pages-context';

const Home: NextPage = (props: any) => {
  const [localeKey, setLocaleKey] = useState('');
  const [dictionary, setDictionary] = useState(null);
  const localeContextObject: any = useContext(localeContext);
  const modalContextObject: any = useContext(modalContext);
  const pagesContextObject: any = useContext(pagesContext);
  const {
    isModalOpen,
    modalKey,
    modalTitle,
    setIsModalOpen,
    setModalKey,
    setModalTitle,
  } = modalContextObject;
  const {
    loader,
    sendContactResponse,
    currentProject,
    setCurrentProject,
    setLoader,
    setSendContactResponse,
    sendMail,
    ModalCloseHendler,
  } = pagesContextObject;
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
      id: '001',
      type: 'text',
      name: 'fullname',
      className: 'form-input',
      placeholder: dictionary
        ? dictionary[localeKey]['fullName']
        : 'სახელი და გვარი',
      needCommonParent: true,
    },
    {
      id: '002',
      type: 'text',
      name: 'phone',
      className: 'form-input',
      placeholder: dictionary ? dictionary[localeKey]['phone'] : 'ტელეფონი',
      needCommonParent: true,
    },
    {
      id: '003',
      type: 'email',
      name: 'email',
      className: 'form-input',
      placeholder: dictionary ? dictionary[localeKey]['email'] : 'ელ.ფოსტა',
      needCommonParent: false,
    },
  ];
  const formTextareas = [
    {
      textareaClass: 'form_textarea',
      textareaName: 'message',
      textareaPlaceholder: dictionary
        ? dictionary[localeKey]['message']
        : 'შეტყობინება',
    },
  ];
  const modalHeader = {
    headerClassname: 'modal_header',
    headerLogoClassname: 'modal_header_logo',
    headerCloseImageSrc: '/images/close.svg',
    colosHendler: ModalCloseHendler,
  };
  const formProps: FormPropsInterface = {
    formClassName: 'form',
    inputs: formInputs,
    inputsCommonParentClass: 'inputs_common_parent',
    needTextareas: true,
    textareas: formTextareas,
    needButton: true,
    loader: loader,
    buttonClass: 'form_button',
    buttonText: dictionary ? dictionary[localeKey]['send'] : 'გაგზავნა',
    ButtoncallBack: null,
    submit: sendMail,
  };
  const confirmProps = {
    acceptHendler: null,
    cancelHendler: ModalCloseHendler,
    question: dictionary
      ? dictionary[localeKey][sendContactResponse]
      : 'თქვენი შეტყობინება წარმატებით გაიგზავნა',
    conteinerClass: 'modal_dialogs_conteiner',
    name: 'send mail',
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
      modalKey === 'FORM'
        ? 'contact_modal_item_conteiner'
        : modalKey === 'GALLERY'
        ? 'modal_item_conteiner'
        : 'modal_item_conteiner',
  };

  return (
    <div className="conteiner">
      <Modal modalprops={modalProps} />
      <Head>
        <title>გამტანერი</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="ნარჩენები, სამშენებლო ნარჩენები, ნაგავი, სამშენებლო ნაგავი, გადაყრა, გატანა, გადაზიდვა | narchenebi, samsheneblo narchenebi, nagavi, samsheneblo nagavi, gadayra, gatana, gadazidva"
        />
        <meta
          name="keywords"
          content="ნარჩენები, სამშენებლო ნარჩენები, ნაგავი, სამშენებლო ნაგავი, გადაყრა, გატანა, გადაზიდვა, narchenebi, samsheneblo narchenebi, nagavi, samsheneblo nagavi, gadayra, gatana, gadazidva"
        />

        <meta property="og:title" content="გამტანერი | Gamtaneri" />
        <meta
          property="og:description"
          content="ნარჩენები, სამშენებლო ნარჩენები, ნაგავი, სამშენებლო ნაგავი, გადაყრა, გატანა, გადაზიდვა | narchenebi, samsheneblo narchenebi, nagavi, samsheneblo nagavi, gadayra, gatana, gadazidva"
        />
        <meta
          property="og:image"
          content="https://gamtaneri.ge/images/logo.png"
        />
        <meta property="og:url" content="https://gamtaneri.ge" />
        <meta property="og:site_name" content="Gamtaneri" />
        <meta property="og:type" content="website" />
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
    `https://gamtaneri.ge/api/client/projects/gettop`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);

  const ourUsers = await fetch(`https://gamtaneri.ge/api/client/users/gettop`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data);

  const contacts = await fetch('https://gamtaneri.ge/api/client/contacts/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data);

  const aboutus = await fetch('https://gamtaneri.ge/api/client/aboutus/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
