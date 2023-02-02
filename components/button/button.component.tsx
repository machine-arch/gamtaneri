import styles from "./button.module.css";
import { FC, useContext, useState, useEffect } from "react";
import { buttonProps } from "../../config/interfaces/app.interfaces";

const Button: FC<buttonProps> = (props) => {
  useEffect(() => {
    return () => {
      window.removeEventListener("click", () => {});
    };
  }, [props]);
  return (
    <div className="button-conteiner">
      <button
        className={styles.main_button}
        onClick={props.hendler}
        datatype={props.datatype}
      >
        {props.name}
      </button>
    </div>
  );
};

export default Button;
