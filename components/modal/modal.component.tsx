import { FC } from "react";
import { modalProps } from "../../config/interfaces/app.interfaces";
import Form from "../form/form.component";
import styles from "./modal.module.css";
import Gallery from "../gallery/gallery.component";

const Modal: FC<modalProps> = (props) => {
  return (
    <>
      {props?.modalprops?.isOpen ? (
        <div className={styles.modal_conteiner}>
          <div className={styles.modal_background}></div>
          <div className={styles.modal}>
            <div className={styles.modal_form_conteiner}>
              {props?.modalprops?.key === "FORM" ? (
                <Form FormProps={props?.modalprops?.FormProps} />
              ) : null}
              {props?.modalprops?.key === "GALLERY" ? <Gallery /> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
