import styles from "./button.module.css";
import { FC, useContext, useState, useEffect } from "react";
import { localeContext } from "../../context/locale-context";

const Button: FC = () => {
  const localeContextObject: any = useContext(localeContext);
  const [localeKey, setLocaleKey] = useState("");
  const [dictionary, setDictionary] = useState({});
  useEffect(() => {
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, [localeContextObject]);
  return (
    <div className="button-conteiner">
      <button className={styles.main_button}>
        {dictionary
          ? dictionary[localeKey]["contactUs"]
          : "ჩვენი მომხმარებლები"}
      </button>
    </div>
  );
};

export default Button;
