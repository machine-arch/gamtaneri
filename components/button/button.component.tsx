import styles from "./button.module.css";
import { FC, useContext, useState, useEffect } from "react";
import { localeContext } from "../../context/locale-context";

const Button: FC = () => {
  const [localeKey, setLocaleKey] = useState("");
  const [dictionary, setDictionary] = useState(null);
  const localeContextObject: any = useContext(localeContext);
  useEffect(() => {
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, [localeContextObject]);
  return (
    <div className="button-conteiner">
      <button className={styles.main_button}>
        {dictionary ? dictionary[localeKey]["contactUs"] : "დაგვიკავშირდით"}
      </button>
    </div>
  );
};

export default Button;
