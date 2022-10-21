import router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../../context/admin/auth.context";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import Header from "../header/header.component";
import Navbar from "./../navbar/navbar.component";
import styles from "./dashboard.module.css";
import DashboardBody from "./dashboardbody/dashboardbody.component";
import Modal from "../modal/modal.component";

const Home = () => {
  const authContextObject: any = useContext(authContext);
  const [needRedirect, setNeedRedirect] = useState(false);
  const [opendMenuItem, setOpendMenuItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isVeriyfied = useRef(false);
  useEffect(() => {
    (async () => {
      if (!isVeriyfied.current) {
        isVeriyfied.current = true;
        if (localStorage.getItem("_token")) {
          await fetch("/api/admin/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: AES.decrypt(
                localStorage.getItem("_token"),
                "secretPassphrase"
              ).toString(enc.Utf8),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data && !data.isValid) {
                setNeedRedirect(true);
              } else if (data && data.isValid) {
                authContextObject.setUser(data.user);
              }
            })
            .catch((err) => {
              throw err;
            });
        } else {
          setNeedRedirect(true);
        }
      }
    })();
  }, [authContextObject]);

  if (needRedirect) {
    router.push("/admin/login");
  } else {
    const witchMenuItem = opendMenuItem
      ? opendMenuItem.getAttribute("datatype")
      : null;
    let inputs = [];
    let textarea = {};
    let formProps = {};
    let fileUploader = {};
    let title = {};
    let close = {};
    let modalProps = null;

    const ModalCloseHendler = () => {
      setIsModalOpen(false);
    };

    switch (witchMenuItem) {
      case "our_users":
        inputs = [
          {
            id: Math.random().toString(),
            name: "name",
            type: "text ",
            className: "form-input",
            placeholder: "დასახელება",
            needCommonParent: false,
          },
        ];
        textarea = {
          textareaClass: "form_textarea",
          textareaName: "description",
          textareaPlaceholder: "აღწერა",
        };
        title = {
          titleClassname: "form_title",
          title: "მომხმარებლის დამატება",
        };
        close = {
          closeClassname: "form_close",
          closeLogoClassname: "footer_close_logo",
          closeSrc: "/images/close.svg",
          hendler: ModalCloseHendler,
        };
        formProps = {
          needClose: true,
          ...close,
          needTitle: true,
          ...title,
          formClassName: "form",
          inputs: inputs,
          inputsCommonParentClass: "inputs_common_parent",
          needTextArea: true,
          ...textarea,
          needButton: true,
          buttonClass: "form_button",
          buttonText: "დამატება",
          ButtoncallBack: (e: Event) => {
            e.preventDefault();
            console.log("clicked");
          },
        };
        modalProps = {
          modal_title: "მომხმარებლები",
          FormProps: formProps,
          isOpen: isModalOpen,
        };
        break;
      case "complated_projects":
        inputs = [
          {
            id: Math.random().toString(),
            name: "projectName",
            type: "text ",
            className: "form-input",
            placeholder: "პროექტის დასახელება",
            needCommonParent: false,
          },
        ];
        textarea = {
          textareaClass: "form_textarea",
          textareaName: "description",
          textareaPlaceholder: "აღწერა",
        };
        title = {
          titleClassname: "form_title",
          title: "დასრულებული პროექტები",
        };
        fileUploader = {
          fileUploaderClass: "form_file_uploader",
          multiple: true,
          fileUploaderName: "projectImages",
        };
        close = {
          closeClassname: "form_close",
          closeLogoClassname: "close_logo",
          closeSrc: "/images/close.svg",
          hendler: ModalCloseHendler,
        };
        formProps = {
          needClose: true,
          ...close,
          needTitle: true,
          ...title,
          formClassName: "form",
          inputs: inputs,
          inputsCommonParentClass: "inputs_common_parent",
          needTextArea: true,
          ...textarea,
          needFileUploader: true,
          ...fileUploader,
          needButton: true,
          buttonClass: "form_button",
          buttonText: "დამატება",

          ButtoncallBack: (e: Event) => {
            e.preventDefault();
            console.log("clicked");
          },
        };
        modalProps = {
          modal_title: "დასრულებული პროექტები",
          FormProps: formProps,
          isOpen: isModalOpen,
        };
        break;
      case "about_us":
        inputs = [
          {
            id: Math.random().toString(),
            name: "aboutUs",
            type: "text ",
            className: "form-input",
            placeholder: "სათაური",
            needCommonParent: false,
          },
        ];
        textarea = {
          textareaClass: "form_textarea",
          textareaName: "description",
          textareaPlaceholder: "აღწერა",
        };
        title = {
          titleClassname: "form_title",
          title: "ჩვენს შესახებ",
        };
        close = {
          closeClassname: "form_close",
          closeLogoClassname: "close_logo",
          closeSrc: "/images/close.svg",
          hendler: ModalCloseHendler,
        };
        fileUploader = {
          fileUploaderClass: "form_file_uploader",
          multiple: true,
          fileUploaderName: "projectImages",
        };
        formProps = {
          needClose: true,
          ...close,
          needTitle: true,
          ...title,
          formClassName: "form",
          inputs: inputs,
          inputsCommonParentClass: "inputs_common_parent",
          needTextArea: true,
          ...textarea,
          needFileUploader: true,
          ...fileUploader,
          needButton: true,
          buttonClass: "form_button",
          buttonText: "დამატება",
          ButtoncallBack: (e: Event) => {
            e.preventDefault();
            console.log("clicked");
          },
        };
        modalProps = {
          modal_title: "ჩვენს შესახებ",
          FormProps: formProps,
          isOpen: isModalOpen,
        };
        break;
      case "contact":
        inputs = [
          {
            id: Math.random().toString(),
            name: "address",
            type: "text ",
            className: "form-input",
            placeholder: "მისამართი",
            needCommonParent: true,
          },
          {
            id: Math.random().toString(),
            name: "email",
            type: "email",
            className: "form-input",
            placeholder: "იმეილი",
            needCommonParent: true,
          },
          {
            id: Math.random().toString(),
            name: "phone",
            type: "text",
            className: "form-input",
            placeholder: "ტელეფონი",
            needCommonParent: false,
          },
        ];
        textarea = {
          textareaClass: "form_textarea",
          textareaName: "description",
          textareaPlaceholder: "აღწერა",
        };
        title = {
          titleClassname: "form_title",
          title: "კონტაქტი",
        };
        close = {
          closeClassname: "form_close",
          closeLogoClassname: "close_logo",
          closeSrc: "/images/close.svg",
          hendler: ModalCloseHendler,
        };
        formProps = {
          needClose: true,
          ...close,
          needTitle: true,
          ...title,
          formClassName: "form",
          inputs: inputs,
          inputsCommonParentClass: "inputs_common_parent",
          needTextArea: true,
          ...textarea,
          needFileUploader: false,
          needButton: true,
          buttonClass: "form_button",
          buttonText: "დამატება",
          ButtoncallBack: (e: Event) => {
            e.preventDefault();
            console.log("clicked");
          },
        };
        modalProps = {
          modal_title: "ჩვენს შესახებ",
          FormProps: formProps,
          isOpen: isModalOpen,
        };
    }
    return (
      <div>
        <Modal modalprops={modalProps} />
        <Header />
        <div className={styles.dashboard_body_conteiner}>
          <Navbar
            setOpendMenuItem={setOpendMenuItem}
            setIsModalOpen={setIsModalOpen}
          />
          <div className={styles.dashboard_body}>
            <DashboardBody
              setIsModalOpen={setIsModalOpen}
              opendMenuItem={opendMenuItem}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
