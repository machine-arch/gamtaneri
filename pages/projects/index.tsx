import Header from '../../components/front/header/header.component';
import styles from '../../styles/Index.module.css';
import { modalContext } from '../../context/modal-context';
import { useContext, useState, useEffect, useRef } from 'react';
import AllProjects from '../../components/front/completedprojects/all-projects.component';
import { localeContext } from '../../context/locale-context';
import { NextPage } from 'next';
import Modal from '../../components/modal/modal.component';
import { FormPropsInterface } from '../../config/interfaces/app.interfaces';
import { pagesContext } from '../../context/pages-context';
import { dataContext } from '../../context/data.context';
import MobileNav from '../../components/front/mobilenav/mobilenav.component';
import Head from 'next/head';

const Projects: NextPage = (props: any) => {
  const modalContextObject: any = useContext(modalContext);
  const localeContextObject: any = useContext(localeContext);
  const pagesContextObject: any = useContext(pagesContext);
  const { isModalOpen, modalKey, modalTitle, setIsModalOpen, setModalKey } =
    modalContextObject;
  const { loader, sendContactResponse, sendMail, ModalCloseHendler } =
    pagesContextObject;
  const [localeKey, setLocaleKey] = useState('');
  const [dictionary, setDictionary] = useState(null);
  const { state, dispatch } = useContext<any>(dataContext);
  const wasFetched = useRef(false);
  useEffect(() => {
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, []);

  useEffect(() => {
    if (!wasFetched.current) {
      wasFetched.current = true;
      dispatch({ type: 'SET_PROJECTS_ONLOAD', payload: props?.projects });
    }
  }, []);

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
    currentproject: [],
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
        <title>ყველა შესრულებული პროექტი</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="„ნარჩენების მართვის კომპანია გამტანერი“ შეიქმნა ნარჩენების მართვის სფეროში მნიშვნელოვანი ცვლილებების განსახორციელებლად. გამტანერები ინტენსიურად იმუშავებენ ნარჩენის წარმომქმნელებთან. თანამშრომლობის მთავარი მიზანი არის არა მხოლოდ ნარჩენის გატანა, არამედ ცნობიერების ამაღლება ნარჩენების მეორადი გამოყენების შესახებ. ნარჩენების სასარგებლო რესურსად გარდაქმნა ჩვენი ქვეყნისთვის იქნება უდიდესი წინგადადგმული ნაბიჯი ეკოლოგიის და ეკონომიკის კუთხით. ასეთი მიდგომა წარმომქმნელებს შეუმცირებს ნარჩენის მოცილების ხარჯს სეპარირებული რესურსიდან მიღებული შემოსავლით. "
        />
        <meta charSet="UTF-8" />
        <meta property="og:title" content="gamtaneri" />
        <meta
          property="og:description"
          content="ნარჩენების მართვის კომპანია „გამტანერის“ მთავარი ფასეულობა უხვად დაგროვილი თეორიული ცოდნისა და პრაქტიკული გამოცდილების მარაგია."
        />
        <meta property="og:image" content="URL-to-your-image" />
        <meta property="og:url" content="https:/gamtaneri.ge" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <Header setismodalopen={setIsModalOpen} setModalKey={setModalKey} />
      </div>
      <MobileNav />
      <section className="allProjects_section">
        <AllProjects />
      </section>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const from = 0,
    count = 10;
  const projects = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}client/projects/getall?from=${from}&count=${count}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);

  return {
    props: {
      projects: await projects.resource,
    },
  };
}

export default Projects;
