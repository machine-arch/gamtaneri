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
  const OurUSersRef = useRef(null);
  const ProductsRef = useRef(null);
  if (needRedirect) {
    router.push("/admin/login");
  } else {
    const witchMenuItem = opendMenuItem
      ? opendMenuItem.getAttribute("datatype")
      : null;
    let inputs = [];
    let textareas = [{}];
    let formProps = {};
    let fileUploader = {};
    let title = {};
    let close = {};
    let modalProps = null;

    const ModalCloseHendler = () => {
      setIsModalOpen(false);
    };

    const CreateOurUSers = (e: any) => {
      e.preventDefault();
      let url = "",
        ref = null,
        body: object,
        headers: HeadersInit,
        projectFormData = null;
      switch (e.target.getAttribute("name")) {
        case "our_users":
          url = "/api/admin/users/create";
          ref = OurUSersRef;
          const data = new FormData(ref.current);
          body = {
            title: data.get("title"),
            title_eng: data.get("title_eng"),
            description: data.get("description"),
            description_eng: data.get("description_eng"),
            token: AES.decrypt(
              localStorage.getItem("_token"),
              "secretPassphrase"
            ).toString(enc.Utf8),
          };
          headers = {
            "Content-Type": "application/json",
          };
          break;
        case "complated_projects":
          url = "/api/admin/projects/create";
          ref = ProductsRef;
          projectFormData = new FormData(ref.current);
          // body = {
          //   title: projectFormData.get("project_name"),
          //   title_eng: projectFormData.get("project_name_eng"),
          //   description: projectFormData.get("description"),
          //   description_eng: projectFormData.get("description_eng"),
          //   images: projectFormData.getAll("images"),
          // };
          headers = {
            "Content-Type": "multipart/form-data",
          };
          break;
      }
      fetch(url, {
        method: "POST",
        headers: headers,
        body: projectFormData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    };

    switch (witchMenuItem) {
      case "our_users":
        inputs = [
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            name: "title",
            type: "text ",
            className: "form-input",
            placeholder: "დასახელება",
            needCommonParent: true,
          },
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            name: "title_eng",
            type: "text ",
            className: "form-input",
            placeholder: "title",
            needCommonParent: true,
          },
        ];
        textareas = [
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            textareaClass: "form_textarea",
            textareaName: "description",
            textareaPlaceholder: "აღწერა",
            type: "textarea",
          },
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            textareaClass: "form_textarea",
            textareaName: "description_eng",
            textareaPlaceholder: "description",
            type: "textarea",
          },
        ];

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
          name: "our_users",
          ref: OurUSersRef,
          needClose: true,
          ...close,
          needTitle: true,
          ...title,
          formClassName: "form",
          inputs: inputs,
          inputsCommonParentClass: "inputs_common_parent",
          needTextarea: false,
          needTextareas: true,
          textareas,
          needButton: true,
          buttonClass: "form_button",
          buttonText: "დამატება",
          ButtoncallBack: (e: Event) => {
            // e.preventDefault();
            // CreateOurUSers;
          },
          submit: CreateOurUSers,
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
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            name: "project_name",
            type: "text ",
            className: "form-input",
            placeholder: "პროექტის დასახელება",
            needCommonParent: true,
          },
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            name: "project_name_eng",
            type: "text ",
            className: "form-input",
            placeholder: "project name",
            needCommonParent: true,
          },
        ];
        textareas = [
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            textareaClass: "form_textarea",
            textareaName: "description",
            textareaPlaceholder: "აღწერა",
            name: "description",
          },
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            textareaClass: "form_textarea",
            textareaName: "description_eng",
            textareaPlaceholder: "description",
            name: "description_eng",
          },
        ];
        title = {
          titleClassname: "form_title",
          title: "დასრულებული პროექტები",
        };
        fileUploader = {
          fileUploaderClass: "form_file_uploader",
          multiple: true,
          fileUploaderName: "images",
        };
        close = {
          closeClassname: "form_close",
          closeLogoClassname: "close_logo",
          closeSrc: "/images/close.svg",
          hendler: ModalCloseHendler,
        };
        formProps = {
          name: "complated_projects",
          ref: ProductsRef,
          submit: CreateOurUSers,
          needClose: true,
          ...close,
          needTitle: true,
          ...title,
          formClassName: "form",
          inputs: inputs,
          inputsCommonParentClass: "inputs_common_parent",
          needTextArea: false,
          needTextareas: true,
          textareas: textareas,
          needFileUploader: true,
          ...fileUploader,
          needButton: true,
          buttonClass: "form_button",
          buttonText: "დამატება",
          ButtoncallBack: (e: Event) => {
            // e.preventDefault();
            // console.log("clicked");
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
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            name: "aboutUs",
            type: "text ",
            className: "form-input",
            placeholder: "სათაური",
            needCommonParent: false,
          },
        ];
        textareas = [
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            textareaClass: "form_textarea",
            textareaName: "description",
            textareaPlaceholder: "აღწერა",
          },
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            textareaClass: "form_textarea",
            textareaName: "description",
            textareaPlaceholder: "description",
          },
        ];
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
          CreateOurUSers: CreateOurUSers,
          needClose: true,
          ...close,
          needTitle: true,
          ...title,
          formClassName: "form",
          inputs: inputs,
          inputsCommonParentClass: "inputs_common_parent",
          needTextArea: false,
          needTextareas: true,
          textareas: textareas,
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
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            name: "address",
            type: "text ",
            className: "form-input",
            placeholder: "მისამართი",
            needCommonParent: true,
          },
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            name: "email",
            type: "email",
            className: "form-input",
            placeholder: "იმეილი",
            needCommonParent: true,
          },
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            name: "phone",
            type: "text",
            className: "form-input",
            placeholder: "ტელეფონი",
            needCommonParent: false,
          },
        ];
        textareas = [
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            textareaClass: "form_textarea",
            textareaName: "description",
            textareaPlaceholder: "აღწერა",
          },
          {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            textareaClass: "form_textarea",
            textareaName: "description",
            textareaPlaceholder: "description",
          },
        ];
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
          CreateOurUSers: CreateOurUSers,
          needClose: true,
          ...close,
          needTitle: true,
          ...title,
          formClassName: "form",
          inputs: inputs,
          inputsCommonParentClass: "inputs_common_parent",
          needTextArea: false,
          needTextareas: true,
          textareas: textareas,
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
