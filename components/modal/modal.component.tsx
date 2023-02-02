import { FC, useState } from "react";
import { modalProps } from "../../config/interfaces/app.interfaces";
import Form from "../form/form.component";
import styles from "./modal.module.css";
import Gallery from "../front/gallery/gallery.component";
import Image from "next/image";
import Confirm from "../confirm/confirm.component";
import Message from "../message/message.component";
import { imageLoaderProp } from "../../utils/app.util";

const Modal: FC<modalProps> = (props) => {
  return (
    <>
      {props?.modalprops?.isOpen ? (
        <div className={styles.modal_conteiner}>
          <div className={styles.modal_background}></div>
          <div className={styles.modal}>
            <div
              className={
                props?.modalprops?.key === "CONFIRM" ||
                props?.modalprops?.key === "MESSAGE"
                  ? props?.modalprops?.confirmProps?.conteinerClass
                  : props?.modalprops?.modal_item_conteiner_class
              }
            >
              {props?.modalprops?.needHeader ? (
                <div
                  className={props?.modalprops?.headerClassname}
                  onClick={props?.modalprops.colosHendler}
                >
                  {props?.modalprops?.needHeaderTitle ? (
                    <h1 className={styles.name}>
                      {props?.modalprops?.modal_title}
                    </h1>
                  ) : null}
                  <Image
                    src={props?.modalprops?.headerCloseImageSrc}
                    alt="modal close svg"
                    width={20}
                    height={20}
                    loader={imageLoaderProp}
                  />
                </div>
              ) : null}
              {props?.modalprops?.key === "FORM" ? (
                <Form
                  FormProps={props?.modalprops?.FormProps}
                  Loader={props?.modalprops?.FormProps?.loader}
                  loadrConteinerClassname={"form_loader_conteiner"}
                />
              ) : null}
              {props?.modalprops?.key === "GALLERY" ? (
                <Gallery
                  currentproject={props?.modalprops?.currentproject}
                  setModalTitle={props?.setModalTitle}
                />
              ) : null}
              {props?.modalprops?.key === "CONFIRM" ? (
                <Confirm confirmProps={props?.modalprops.confirmProps} />
              ) : null}
              {props?.modalprops?.key === "MESSAGE" ? (
                <Message confirmProps={props.modalprops.confirmProps} />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
