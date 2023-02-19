import router from "next/router";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../../context/admin/auth.context";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import Header from "../header/header.component";
import Navbar from "./../navbar/navbar.component";
import styles from "./dashboard.module.css";
import DashboardBody from "./dashboardbody/dashboardbody.component";
import Modal from "../../modal/modal.component";
import { FormPropsInterface } from "../../../config/interfaces/app.interfaces";
import { httpRequest } from "../../../utils/app.util";
import { modalContext } from "../../../context/modal-context";
import {
  editorContext,
  editorContextInterface,
} from "../../../context/admin/editor.context";
import {
  projectsContext,
  projectsContextInterface,
} from "../../../context/admin/projects.context";

const Home = () => {
  const from = 0,
    count = 6;
  const authContextObject: any = useContext(authContext);
  const [needRedirect, setNeedRedirect] = useState(false);
  const [opendMenuItem, setOpendMenuItem] = useState<any>(null);
  const [pageData, setPageData] = useState([]);
  const [actionType, setActionType] = useState("");
  const [httpProps, setHttpProps] = useState<any>(null);
  const [currentItemId, setCurrentItemId] = useState<any>(null);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const isVeriyfied = useRef(false);
  const [editorLocale, setEditorLocale] = useState("ka");
  const [projectFiles, setProjectFiles] = useState<Object[] | String[]>([]);

  const modalContextObject: any = useContext(modalContext);
  const editorObject: editorContextInterface = useContext(editorContext);
  const projectsObject: projectsContextInterface = useContext(projectsContext);
  const { isModalOpen, modalKey, setIsModalOpen, setModalKey, setModalTitle } =
    modalContextObject;
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
                const token = AES.encrypt(
                  data.user.token,
                  "secretPassphrase"
                ).toString();
                localStorage.setItem("_token", token);
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
  const AboutUsRef = useRef(null);
  const ProductsRef = useRef(null);
  const OurUsersRef = useRef(null);
  const ContactsUsRef = useRef(null);
  if (needRedirect) {
    router.push("/admin/login");
  } else {
    const currentPage = opendMenuItem
      ? opendMenuItem.getAttribute("datatype")
      : null;
    let inputs = [];
    let textareas = [{}];
    let editors = [];
    let formProps: FormPropsInterface;
    let fileUploader = {};
    let title = {};
    let modalHeader = {};
    let modalProps = null;
    let ConfirmProps = null;
    let url = "",
      oldImages = [],
      ref = null,
      headers: HeadersInit,
      formdata = null,
      method = "POST",
      GetOneUrl = "",
      token = "",
      props = {},
      response = null;

    /**
     * @description This function is used to close modal if user click on close button
     */
    const ModalCloseHendler = () => {
      setIsModalOpen(false);
      setEditorLocale("ka");
      setProjectFiles([]);
      editorObject.editorDateGeo = "";
      editorObject.editorDataEng = "";
      projectsObject.projectNameGeo = "";
      projectsObject.projectNameEng = "";
      setModalTitle("");
    };

    /**
     *@description this function is used to init create action for page witch is currently opened, ant then if user clickc  okey button in modal send request to server
     * @param e
     * @returns void
     */
    const initCreate = async (e: any) => {
      e.preventDefault();
      return new Promise((resolve, reject) => {
        switch (currentPage) {
          case "our_users":
            url = "/api/admin/users/create";
            ref = OurUsersRef;
            const data = new FormData(ref.current);
            formdata = JSON.stringify({
              title: data.get("title"),
              title_eng: data.get("title_eng"),
              description: data.get("description"),
              description_eng: data.get("description_eng"),
              token: AES.decrypt(
                localStorage.getItem("_token"),
                "secretPassphrase"
              ).toString(enc.Utf8),
            });
            headers = {
              "Content-Type": "application/json",
            };
            props = {
              url,
              method,
              headers,
              formdata,
            };
            setHttpProps(props);
            resolve(true);
            break;
          case "complated_projects":
            url = "/api/admin/projects/create";
            ref = ProductsRef;
            formdata = new FormData();
            formdata.append("description", editorObject?.editorDateGeo);
            formdata.append("description_eng", editorObject?.editorDataEng);
            formdata.append("project_name", projectsObject?.projectNameGeo);
            formdata.append("project_name_eng", projectsObject?.projectNameEng);
            formdata.append(
              "token",
              AES.decrypt(
                localStorage.getItem("_token"),
                "secretPassphrase"
              ).toString(enc.Utf8)
            );
            projectFiles.forEach((file: any) => {
              formdata.append("images", file);
            });
            headers = {};
            props = {
              url,
              method,
              headers,
              formdata,
            };
            setHttpProps(props);
            resolve(true);
            break;
        }
      }).then((res) => {
        setModalKey("CONFIRM");
      });
    };

    /**
     * @description this function is used to get current item from server, and then open modal with current item data for update
     */
    const getItem = async (id: any) => {
      switch (currentPage) {
        case "our_users":
          token = AES.decrypt(
            localStorage.getItem("_token"),
            "secretPassphrase"
          ).toString(enc.Utf8);
          GetOneUrl = `/api/admin/users/${id}?token=${token}`;
          response = await httpRequest(GetOneUrl, "GET");
          setCurrentItem(response.resource);
          break;
        case "complated_projects":
          token = AES.decrypt(
            localStorage.getItem("_token"),
            "secretPassphrase"
          ).toString(enc.Utf8);
          GetOneUrl = `/api/admin/projects/${id}?token=${token}`;
          response = await httpRequest(GetOneUrl, "GET");
          setCurrentItem(response.resource);
          editorObject.editorDateGeo = response?.resource?.description;
          editorObject.editorDataEng = response?.resource?.description_eng;
          projectsObject.projectNameGeo = response?.resource?.project_name;
          projectsObject.projectNameEng = response?.resource?.project_name_eng;
          setProjectFiles(JSON.parse(response.resource.images));
          break;
        case "about_us":
          token = AES.decrypt(
            localStorage.getItem("_token"),
            "secretPassphrase"
          ).toString(enc.Utf8);
          GetOneUrl = `/api/admin/aboutus/${id}?token=${token}`;
          response = await httpRequest(GetOneUrl, "GET");
          setCurrentItem(response.resource);
          break;
        case "contact":
          token = AES.decrypt(
            localStorage.getItem("_token"),
            "secretPassphrase"
          ).toString(enc.Utf8);
          GetOneUrl = `/api/admin/contacts/${id}?token=${token}`;
          response = await httpRequest(GetOneUrl, "GET");
          setCurrentItem(response.resource);
          break;
      }
    };

    /**
     * @description this function is used to init update action for page witch is currently opened, create params witch is required for update request, and then if user clickc  okey button in modal send request to server
     */
    const initUpdate = async (e: any) => {
      e.preventDefault();
      return new Promise((resolve, reject) => {
        switch (currentPage) {
          case "our_users":
            url = "/api/admin/users/update";
            ref = OurUsersRef;
            const data = new FormData(ref.current);
            formdata = JSON.stringify({
              id: currentItemId,
              title: data.get("title"),
              title_eng: data.get("title_eng"),
              description: data.get("description"),
              description_eng: data.get("description_eng"),
              token: AES.decrypt(
                localStorage.getItem("_token"),
                "secretPassphrase"
              ).toString(enc.Utf8),
            });
            headers = {
              "Content-Type": "application/json",
            };
            method = "PUT";
            props = {
              url,
              method,
              headers,
              formdata,
            };
            setHttpProps(props);
            resolve(true);
            break;
          case "complated_projects":
            url = "/api/admin/projects/update";
            ref = ProductsRef;
            formdata = new FormData();
            formdata.append("description", editorObject?.editorDateGeo);
            formdata.append("description_eng", editorObject?.editorDataEng);
            formdata.append("project_name", projectsObject?.projectNameGeo);
            formdata.append("project_name_eng", projectsObject?.projectNameEng);
            formdata.append(
              "token",
              AES.decrypt(
                localStorage.getItem("_token"),
                "secretPassphrase"
              ).toString(enc.Utf8)
            );
            formdata.append("id", currentItemId);
            projectFiles.forEach((file: any) => {
              oldImages.push(file);
              typeof file === "object"
                ? formdata.append("files", file)
                : formdata.append("images", JSON.stringify(oldImages));
            });
            headers = {};
            method = "PUT";
            props = {
              url,
              method,
              headers,
              formdata,
            };
            setHttpProps(props);
            resolve(true);
            break;
          case "about_us":
            url = "/api/admin/aboutus/update";
            ref = AboutUsRef;
            formdata = new FormData(ref?.current);
            formdata.append(
              "token",
              AES.decrypt(
                localStorage.getItem("_token"),
                "secretPassphrase"
              ).toString(enc.Utf8)
            );
            headers = {};
            method = "PUT";
            props = {
              url,
              method,
              headers,
              formdata,
            };
            setHttpProps(props);
            resolve(true);
            break;
          case "contact":
            url = "/api/admin/contacts/update";
            ref = ContactsUsRef;
            const contactData = new FormData(ref?.current);
            formdata = JSON.stringify({
              id: currentItemId,
              address: contactData.get("address"),
              address_eng: contactData.get("address_eng"),
              email: contactData.get("email"),
              phone: contactData.get("phone"),
              description: contactData.get("description"),
              description_eng: contactData.get("description_eng"),
              token: AES.decrypt(
                localStorage.getItem("_token"),
                "secretPassphrase"
              ).toString(enc.Utf8),
            });
            headers = {
              "Content-Type": "application/json",
            };
            method = "PUT";
            props = {
              url,
              method,
              headers,
              formdata,
            };
            setHttpProps(props);
            resolve(true);
        }
      }).then((res) => {
        setModalKey("CONFIRM");
      });
    };

    /**
     * @description this function is used to sent request to server for create action with params witch is created in initCreate function
     */
    const create = async (e: any) => {
      const response = await httpRequest(
        httpProps.url,
        httpProps.method,
        httpProps.formdata,
        httpProps.headers
      );
      if (response.status === 200) {
        setPageData(response);
        setModalKey("MESSAGE");
      } else {
        setModalKey("MESSAGE");
      }
    };

    /**
     * @description this function is used to sent request to server for update action with params witch is created in initUpdate function
     */
    const update = async (e: any) => {
      const response = await httpRequest(
        httpProps.url,
        httpProps.method,
        httpProps.formdata,
        httpProps.headers
      );
      if (response.status === 200) {
        setPageData(response);
        setModalKey("MESSAGE");
      } else {
        setModalKey("ERROR");
      }
    };

    /**
     * @description this function is used to sent request to server for delete action.
     */
    const deleteItem = async (e: any) => {
      switch (currentPage) {
        case "our_users":
          url = `/api/admin/users/delete/?token=${AES.decrypt(
            localStorage.getItem("_token"),
            "secretPassphrase"
          ).toString(enc.Utf8)}&id=${currentItemId}`;
          break;
        case "complated_projects":
          url = `/api/admin/projects/delete/?token=${AES.decrypt(
            localStorage.getItem("_token"),
            "secretPassphrase"
          ).toString(enc.Utf8)}&id=${currentItemId}`;
          break;
      }
      const response = await httpRequest(url, "DELETE");
      setPageData(response);
      setModalKey("MESSAGE");
    };

    const denialOperation = (e: any) => {
      setModalKey("FORM");
    };

    switch (currentPage) {
      case "our_users":
        switch (actionType) {
          case "create":
            inputs = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "title",
                type: "text ",
                className: "form-input",
                placeholder: "დასახელება",
                needCommonParent: true,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "title_eng",
                type: "text ",
                className: "form-input",
                placeholder: "title",
                needCommonParent: true,
              },
            ];
            textareas = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description",
                textareaPlaceholder: "აღწერა",
                type: "textarea",
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description_eng",
                textareaPlaceholder: "description",
                type: "textarea",
              },
            ];
            title = {
              titleClassname: "form_title",
              title:
                actionType === "create"
                  ? "მომხმარებლის დამატება"
                  : actionType === "edit"
                  ? "მომხმარებლის რედაქტირება"
                  : "",
            };
            modalHeader = {
              headerClassname: "dashboard_modal_header",
              headerLogoClassname: "modal_close_logo",
              headerCloseImageSrc: "/images/close.svg",
              needHeaderTitle: false,
              colosHendler: ModalCloseHendler,
            };
            formProps = {
              name: "our_users",
              ref: OurUsersRef,
              needTitle: true,
              ...title,
              formClassName: "form",
              inputs: inputs,
              inputsCommonParentClass: "inputs_common_parent",
              needTextareas: true,
              textareas,
              needButton: true,
              buttonClass: "form_button",
              buttonText: "დამატება",
              ButtoncallBack: (e: SyntheticEvent) => {
                return;
                // e.preventDefault();
                // CreateOurUSers;
              },
              submit: initCreate,
            };
            ConfirmProps = {
              acceptHendler: create,
              cancelHendler: ModalCloseHendler,
              question: "Are you sure you want to create item?",
              conteinerClass: "modal_dialogs_conteiner",
              name: "our_users",
            };
            modalProps = {
              modal_title: "მომხმარებლები",
              FormProps: formProps,
              confirmProps: ConfirmProps,
              isOpen: isModalOpen,
              key: modalKey,
              needHeader: true,
              ...modalHeader,
              modal_item_conteiner_class: "modal_item_conteiner",
            };
            break;
          case "edit":
            inputs = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "title",
                type: "text ",
                className: "form-input",
                placeholder: "დასახელება",
                needCommonParent: true,
                value: currentItem?.title,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "title_eng",
                type: "text ",
                className: "form-input",
                placeholder: "title",
                needCommonParent: true,
                value: currentItem?.title_eng,
              },
            ];
            textareas = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description",
                textareaPlaceholder: "აღწერა",
                type: "textarea",
                value: currentItem?.description,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description_eng",
                textareaPlaceholder: "description",
                type: "textarea",
                value: currentItem?.description_eng,
              },
            ];

            title = {
              titleClassname: "form_title",
              title: "მომხმარებლის რედაქტირება",
            };
            modalHeader = {
              headerClassname: "dashboard_modal_header",
              headerLogoClassname: "modal_close_logo",
              headerCloseImageSrc: "/images/close.svg",
              needHeaderTitle: false,
              colosHendler: ModalCloseHendler,
            };
            formProps = {
              name: "our_users",
              ref: OurUsersRef,
              needTitle: true,
              ...title,
              formClassName: "form",
              inputs: inputs,
              inputsCommonParentClass: "inputs_common_parent",
              needTextareas: true,
              textareas,
              needButton: true,
              buttonClass: "form_button",
              buttonText: "დამატება",
              ButtoncallBack: initUpdate,
              submit: null,
              data: currentItem,
            };

            ConfirmProps = {
              acceptHendler: update,
              cancelHendler: ModalCloseHendler,
              question: "Are you sure you want to update this item?",
              conteinerClass: "modal_dialogs_conteiner",
            };

            modalProps = {
              modal_title: "მომხმარებლები",
              FormProps: formProps,
              confirmProps: ConfirmProps,
              isOpen: isModalOpen,
              key: modalKey,
              needHeader: true,
              ...modalHeader,
              modal_item_conteiner_class: "modal_item_conteiner",
            };
            break;
          case "delete":
            modalHeader = {
              headerClassname: "dashboard_modal_header",
              headerLogoClassname: "modal_close_logo",
              headerCloseImageSrc: "/images/close.svg",
              needHeaderTitle: false,
              colosHendler: ModalCloseHendler,
            };
            ConfirmProps = {
              acceptHendler: deleteItem,
              cancelHendler: ModalCloseHendler,
              question: "Are you sure you want to delete this item?",
              conteinerClass: "modal_dialogs_conteiner",
              name: "our_users",
            };
            modalProps = {
              modal_title: "მომხმარებლები",
              isOpen: isModalOpen,
              confirmProps: ConfirmProps,
              key: modalKey,
              needHeader: true,
              ...modalHeader,
              modal_item_conteiner_class: "modal_item_conteiner",
            };
        }
        break;
      case "complated_projects":
        switch (actionType) {
          case "create":
            inputs = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "project_name",
                type: "text ",
                className: "form-input",
                placeholder: "პროექტის დასახელება",
                needCommonParent: true,
                value: projectsObject.projectNameGeo,
                eventType: "onChange",
                eventHandler: (e: any) => {
                  projectsObject.projectNameGeo = e.target.value;
                },
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "project_name_eng",
                type: "text ",
                className: "form-input",
                placeholder: "Project Name",
                needCommonParent: true,
                value: projectsObject.projectNameEng,
                eventType: "onChange",
                eventHandler: (e: any) => {
                  projectsObject.projectNameEng = e.target.value;
                },
              },
            ];
            textareas = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description",
                textareaPlaceholder: "აღწერა",
                name: "description",
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description_eng",
                textareaPlaceholder: "description",
                name: "description_eng",
              },
            ];
            editors = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                editorClass: "form_editor",
                editorName: "editor",
                editorPlaceholder: "პროქტის აღწერა",
                name: "editor",
                locale: "ka",
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                editorClass: "form_editor",
                editorName: "editor_eng",
                editorPlaceholder: "project description",
                name: "editor_eng",
                locale: "en",
              },
            ];
            title = {
              titleClassname: "form_title",
              title:
                actionType === "create"
                  ? "პროექტის დამატება"
                  : actionType === "edit"
                  ? "პროექტის რედაქტირება"
                  : "",
            };
            fileUploader = {
              fileUploaderClass: "form_file_uploader",
              multiple: true,
              fileUploaderName: "images",
              uploadedFiles: projectFiles,
              setProjectFiles: setProjectFiles,
              UploaderEventHandler: (e: any) => {
                setProjectFiles([
                  ...projectFiles,
                  ...Array.from(e.target.files),
                ]);
              },
            };
            modalHeader = {
              headerClassname: "dashboard_modal_header",
              headerLogoClassname: "modal_close_logo",
              headerCloseImageSrc: "/images/close.svg",
              needHeaderTitle: false,
              colosHendler: ModalCloseHendler,
            };
            formProps = {
              name: "complated_projects",
              ref: ProductsRef,
              needTitle: true,
              ...title,
              formClassName: "form",
              inputs: inputs,
              inputsCommonParentClass: "inputs_common_parent",
              needTextareas: false,
              textareas: textareas,
              needFileUploader: true,
              ...fileUploader,
              needEditors: true,
              editors: editors,
              editorLocale: editorLocale,
              setEditorLocale: setEditorLocale,
              editorConteiner: styles.editorConteiner,
              editorSwitchersConteiner: styles.editorSwitchersConteiner,
              needButton: true,
              buttonClass: "form_button",
              buttonText: "დამატება",
              ButtoncallBack: (e: SyntheticEvent) => {
                // e.preventDefault();
              },
              submit: initCreate,
            };
            ConfirmProps = {
              acceptHendler: create,
              cancelHendler: ModalCloseHendler,
              question: "Are you sure you want to create item?",
              conteinerClass: "modal_dialogs_conteiner",
              name: "our_users",
            };
            modalProps = {
              modal_title: "დასრულებული პროექტები",
              FormProps: formProps,
              confirmProps: ConfirmProps,
              isOpen: isModalOpen,
              key: modalKey,
              needHeader: true,
              ...modalHeader,
              modal_item_conteiner_class: "modal_item_conteiner",
            };
            break;
          case "edit":
            inputs = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "project_name",
                type: "text ",
                className: "form-input",
                placeholder: "პროექტის დასახელება",
                needCommonParent: true,
                value: currentItem?.project_name,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "project_name_eng",
                type: "text ",
                className: "form-input",
                placeholder: "project name",
                needCommonParent: true,
                value: currentItem?.project_name_eng,
              },
            ];
            textareas = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description",
                textareaPlaceholder: "აღწერა",
                name: "description",
                value: currentItem?.description,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description_eng",
                textareaPlaceholder: "description",
                name: "description_eng",
                value: currentItem?.description_eng,
              },
            ];
            editors = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                editorClass: "form_editor",
                editorName: "editor",
                editorPlaceholder: "აღწერა",
                name: "editor",
                locale: "ka",
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                editorClass: "form_editor",
                editorName: "editor_eng",
                editorPlaceholder: "description",
                name: "editor_eng",
                locale: "en",
              },
            ];
            title = {
              titleClassname: "form_title",
              title:
                actionType === "edit"
                  ? "პროექტის დამატება"
                  : actionType === "edit"
                  ? "პროექტის რედაქტირება"
                  : "",
            };
            fileUploader = {
              fileUploaderClass: "form_file_uploader",
              multiple: true,
              fileUploaderName: "images",
              paht: currentItem?.images,
              uploadedFiles: projectFiles,
              setProjectFiles: setProjectFiles,
              UploaderEventHandler: (e: any) => {
                setProjectFiles([
                  ...projectFiles,
                  ...Array.from(e.target.files),
                ]);
              },
            };
            modalHeader = {
              headerClassname: "dashboard_modal_header",
              headerLogoClassname: "modal_close_logo",
              headerCloseImageSrc: "/images/close.svg",
              needHeaderTitle: false,
              colosHendler: ModalCloseHendler,
            };
            formProps = {
              name: "complated_projects",
              ref: ProductsRef,
              needTitle: true,
              ...title,
              formClassName: "form",
              inputs: inputs,
              inputsCommonParentClass: "inputs_common_parent",
              needTextareas: false,
              textareas: textareas,
              needFileUploader: true,
              ...fileUploader,
              needEditors: true,
              editors: editors,
              setEditorLocale: setEditorLocale,
              editorLocale: editorLocale,
              editorConteiner: styles.editorConteiner,
              editorSwitchersConteiner: styles.editorSwitchersConteiner,
              needButton: true,
              buttonClass: "form_button",
              buttonText: "დამატება",
              ButtoncallBack: (e: SyntheticEvent) => {
                // e.preventDefault();
              },
              submit: initUpdate,
            };
            ConfirmProps = {
              acceptHendler: update,
              cancelHendler: ModalCloseHendler,
              question: "Are you sure you want to update this item?",
              conteinerClass: "modal_dialogs_conteiner",
              name: "our_users",
            };
            modalProps = {
              modal_title: "დასრულებული პროექტები",
              FormProps: formProps,
              confirmProps: ConfirmProps,
              isOpen: isModalOpen,
              key: modalKey,
              needHeader: true,
              ...modalHeader,
              modal_item_conteiner_class: "modal_item_conteiner",
            };
            break;
          case "delete":
            modalHeader = {
              headerClassname: "dashboard_modal_header",
              headerLogoClassname: "modal_close_logo",
              headerCloseImageSrc: "/images/close.svg",
              needHeaderTitle: false,
              colosHendler: ModalCloseHendler,
            };
            ConfirmProps = {
              acceptHendler: deleteItem,
              cancelHendler: ModalCloseHendler,
              question: "Are you sure you want to delete this item?",
              conteinerClass: "modal_dialogs_conteiner",
              name: "our_users",
            };
            modalProps = {
              modal_title: "მომხმარებლები",
              isOpen: isModalOpen,
              confirmProps: ConfirmProps,
              key: modalKey,
              needHeader: true,
              ...modalHeader,
              modal_item_conteiner_class: "modal_item_conteiner",
            };
        }
        break;
      case "about_us":
        switch (actionType) {
          case "edit":
            inputs = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "title",
                type: "text ",
                className: "form-input",
                placeholder: "სათაური",
                needCommonParent: true,
                value: currentItem?.title,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "title_eng",
                type: "text ",
                className: "form-input",
                placeholder: "title",
                needCommonParent: true,
                value: currentItem?.title_eng,
              },
            ];
            textareas = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description",
                textareaPlaceholder: "აღწერა",
                value: currentItem?.description,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description_eng",
                textareaPlaceholder: "description",
                value: currentItem?.description_eng,
              },
            ];
            title = {
              titleClassname: "form_title",
              title: "ჩვენს შესახებ",
            };
            modalHeader = {
              headerClassname: "dashboard_modal_header",
              headerLogoClassname: "modal_close_logo",
              headerCloseImageSrc: "/images/close.svg",
              needHeaderTitle: false,
              colosHendler: ModalCloseHendler,
            };
            fileUploader = {
              fileUploaderClass: "form_file_uploader",
              multiple: true,
              fileUploaderName: "projectImages",
            };
            formProps = {
              name: "about_us",
              ref: AboutUsRef,
              submit: null,
              needTitle: true,
              ...title,
              formClassName: "form",
              inputs: inputs,
              inputsCommonParentClass: "inputs_common_parent",
              needTextareas: true,
              textareas: textareas,
              needFileUploader: true,
              ...fileUploader,
              needButton: true,
              buttonClass: "form_button",
              buttonText: "დამატება",
              ButtoncallBack: initUpdate,
            };
            ConfirmProps = {
              acceptHendler: update,
              cancelHendler: ModalCloseHendler,
              question: "Are you sure you want to update this item?",
              conteinerClass: "modal_dialogs_conteiner",
              name: "about_us",
            };
            modalProps = {
              modal_title: "ჩვენს შესახებ",
              FormProps: formProps,
              confirmProps: ConfirmProps,
              isOpen: isModalOpen,
              key: modalKey,
              needHeader: true,
              ...modalHeader,
              modal_item_conteiner_class: "modal_item_conteiner",
            };
        }
        break;
      case "contact":
        switch (actionType) {
          case "edit":
            inputs = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "address",
                type: "text ",
                className: "form-input",
                placeholder: "მისამართი",
                needCommonParent: true,
                value: currentItem?.address,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "address_eng",
                type: "text ",
                className: "form-input",
                placeholder: "address",
                needCommonParent: true,
                value: currentItem?.address_eng,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "email",
                type: "email",
                className: "form-input",
                placeholder: "იმეილი",
                needCommonParent: true,
                value: currentItem?.email,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                name: "phone",
                type: "text",
                className: "form-input",
                placeholder: "ტელეფონი",
                needCommonParent: false,
                value: currentItem?.phone,
              },
            ];
            textareas = [
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description",
                textareaPlaceholder: "აღწერა",
                value: currentItem?.description,
              },
              {
                id:
                  Date.now().toString(36) + Math.random().toString(36).slice(2),
                textareaClass: "form_textarea",
                textareaName: "description_eng",
                textareaPlaceholder: "description",
                value: currentItem?.description_eng,
              },
            ];
            title = {
              titleClassname: "form_title",
              title: "კონტაქტი",
            };
            modalHeader = {
              headerClassname: "dashboard_modal_header",
              headerLogoClassname: "modal_close_logo",
              headerCloseImageSrc: "/images/close.svg",
              needHeaderTitle: false,
              colosHendler: ModalCloseHendler,
            };
            formProps = {
              name: "contacts",
              ref: ContactsUsRef,
              submit: null,
              needTitle: true,
              ...title,
              formClassName: "form",
              inputs: inputs,
              inputsCommonParentClass: "inputs_common_parent",
              needTextareas: true,
              textareas: textareas,
              needFileUploader: false,
              needButton: true,
              buttonClass: "form_button",
              buttonText: "დამატება",
              ButtoncallBack: initUpdate,
            };
            ConfirmProps = {
              acceptHendler: update,
              cancelHendler: ModalCloseHendler,
              question: "Are you sure you want to update this item?",
              conteinerClass: "modal_dialogs_conteiner",
              name: "about_us",
            };
            modalProps = {
              modal_title: "ჩვენს შესახებ",
              FormProps: formProps,
              confirmProps: ConfirmProps,
              isOpen: isModalOpen,
              key: modalKey,
              needHeader: true,
              ...modalHeader,
              modal_item_conteiner_class: "modal_item_conteiner",
            };
        }
    }
    return (
      <div>
        <Modal modalprops={modalProps} />
        <Header />
        <div className={styles.dashboard_body_conteiner}>
          <Navbar
            setOpendMenuItem={setOpendMenuItem}
            setIsModalOpen={setIsModalOpen}
            data={pageData}
            setPageData={setPageData}
            from={from}
            count={count}
          />
          <div className={styles.dashboard_body}>
            <DashboardBody
              setIsModalOpen={setIsModalOpen}
              opendMenuItem={opendMenuItem}
              data={pageData}
              setPageData={setPageData}
              setActionType={setActionType}
              currentpage={currentPage}
              setModalKey={setModalKey}
              setCurrentItemID={setCurrentItemId}
              currentItem={currentItem}
              getItem={getItem}
              from={from}
              count={count}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
