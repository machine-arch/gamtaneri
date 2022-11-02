import { FC } from "react";
import { modalProps } from "../../config/interfaces/app.interfaces";
import Form from "../form/form.component";
import styles from "./modal.module.css";
import Gallery from "../front/gallery/gallery.component";
import Image from "next/image";

const Modal: FC<modalProps> = (props) => {
  return (
    <>
      {props?.modalprops?.isOpen ? (
        <div className={styles.modal_conteiner}>
          <div className={styles.modal_background}></div>
          <div className={styles.modal}>
            <div className={styles.modal_item_conteiner}>
              {props?.modalprops?.needClose ? (
                <div
                  className={props?.modalprops?.closeClassname}
                  onClick={props?.modalprops.hendler}
                >
                  <Image
                    src={props?.modalprops?.closeSrc}
                    alt="modal close svg"
                    width={20}
                    height={20}
                  />
                </div>
              ) : null}
              {props?.modalprops?.key === "FORM" ? (
                <Form FormProps={props?.modalprops?.FormProps} />
              ) : null}
              {props?.modalprops?.key === "GALLERY" ? (
                <Gallery currentproject={props?.modalprops?.currentproject} />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
