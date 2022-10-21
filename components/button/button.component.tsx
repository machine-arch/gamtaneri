import styles from "./button.module.css";
import { FC, useContext, useState, useEffect } from "react";
import { localeContext } from "../../context/locale-context";
import { buttonProps } from "../../config/interfaces/app.interfaces";

const Button: FC<buttonProps> = (props) => {
  return (
    <div className="button-conteiner">
      <button className={styles.main_button} onClick={props.hendler}>
        {props.name}
      </button>
    </div>
  );
};

export default Button;
