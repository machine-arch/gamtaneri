import { NextPage } from 'next';
import styles from '../../styles/Index.module.css';
import { useContext, useEffect, useState } from 'react';
import { httpRequest } from '../../utils/app.util';
import ProjectDetal from '../../components/front/completedprojects/project-detal.component';
import { modalContext } from '../../context/modal-context';
import { localeContext } from '../../context/locale-context';
import { pagesContext } from '../../context/pages-context';
import { FormPropsInterface } from '../../config/interfaces/app.interfaces';
import Header from '../../components/front/header/header.component';
import Modal from '../../components/modal/modal.component';
import Footer from '../../components/front/footer/footer.component';

const ProjectDetalPage: NextPage = (props: any) => {
  const modalContextObject: any = useContext(modalContext);
  const localeContextObject: any = useContext(localeContext);
  const pagesContextObject: any = useContext(pagesContext);
  const { isModalOpen, modalKey, modalTitle, setIsModalOpen, setModalKey } =
    modalContextObject;
  const { loader, sendContactResponse, sendMail, ModalCloseHendler } =
    pagesContextObject;
  const [localeKey, setLocaleKey] = useState('');
  const [dictionary, setDictionary] = useState(null);
  useEffect(() => {
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, [localeContextObject.localeKey, localeContextObject.dictionary]);

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
    <>
      <div className="project_detal_conteiner">
        <Modal modalprops={modalProps} />
        <div className={styles.header}>
          <Header setismodalopen={setIsModalOpen} setModalKey={setModalKey} />
        </div>
        <ProjectDetal project={props.project} localeKey={localeKey} />
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
    </>
  );
};

export async function getServerSideProps({ params }) {
  const project = await httpRequest(
    `https://gamtaneri.ge/api/client/projects/${params.itemID}`,
    'GET'
  );
  const contacts = await fetch('https://gamtaneri.ge/api/client/contacts/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  return {
    props: {
      project: project.resource,
      contacts: contacts.resource,
    },
  };
}

export default ProjectDetalPage;
