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
    let textarea = [];
    let formProps = {};
    let modalProps = null;

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
        textarea = [
          {
            textareaClass: "footer_form_textarea",
            textareaName: "description",
            textareaPlaceholder: "აღწერა",
          },
        ];
        formProps = {
          formClassName: "footer_form",
          inputs: inputs,
          inputsCommonParentClass: "footer_inputs_common_parent",
          needTextArea: true,
          ...textarea,
          needButton: true,
          buttonClass: "footer_form_button",
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
            <DashboardBody />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
