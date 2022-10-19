import { FC } from "react";
import { modalProps } from "../../../config/interfaces/app.interfaces";
import Form from "../../form/form.component";
import styles from "./modal.module.css";

const Modal: FC<modalProps> = (props) => {
  return (
    <>
      {props?.modalprops?.isOpen ? (
        <div className={styles.modal_conteiner}>
          <div className={styles.modal_background}></div>
          <div className={styles.modal}>
            <div className={styles.modal_title_conteiner}>
              <h1 className={styles.modal_title}>
                {props?.modalprops?.modal_title}
              </h1>
            </div>
            <div className={styles.modal_form_conteiner}>
              <Form FormProps={props?.modalprops?.FormProps} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
