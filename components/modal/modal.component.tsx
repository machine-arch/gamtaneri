import { FC } from "react";
import { modalProps } from "../../config/interfaces/app.interfaces";
import Form from "../form/form.component";
import styles from "./modal.module.css";

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
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
