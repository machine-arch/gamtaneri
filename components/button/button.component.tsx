import styles from "./button.module.css";
import { FC, useContext, useState, useEffect } from "react";
import { localeContext } from "../../context/locale-context";

const Button: FC = () => {
  const localeContextObject: any = useContext(localeContext);
  const [localeKey, setLocaleKey] = useState("");
  useEffect(() => {
    setLocaleKey(localeContextObject.localeKey);
  }, [localeContextObject]);
  return (
    <div className="button-conteiner">
      <button className={styles.main_button}>
        {localeContextObject.dictionary
          ? localeContextObject.dictionary[localeKey]["contactUs"]
          : "ჩვენი მომხმარებლები"}
      </button>
    </div>
  );
};

export default Button;
