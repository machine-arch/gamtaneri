import Image from "next/image";
import styles from "./header.module.css";
import Button from "../../button/button.component";
import {
  ScrollContext,
  scrollContextInterface,
} from "../../../context/scroll-context";
import { useContext, useEffect, useState } from "react";
import { localeContext } from "../../../context/locale-context";
import { FC } from "react";
import { switchLanguage } from "../../../utils/app.util";

const Header: FC = () => {
  const [scrollRefs, setScrollRefs] = useState(null);
  const [localeKey, setLocaleKey] = useState("");
  const [dictionary, setDictionary] = useState(null);
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  const localeContextObject: any = useContext(localeContext);
  useEffect(() => {
    setScrollRefs(scrollContext);
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, [scrollContext, localeContextObject]);

  const scrollTo = (ref: any | undefined) => {
    return ref
      ? window.scrollTo({
          top: ref.current?.offsetTop - 100,
          behavior: "smooth",
        })
      : null;
  };

  return (
    <div className={styles.header_conteiner}>
      <div
        className={styles.header_logo_conteiner}
        onClick={() => {
          scrollTo(scrollRefs.mainSection);
        }}
      >
        <Image src="/images/logo.svg" alt="main logo" width={180} height={30} />
      </div>
      <div className={styles.header_menu}>
        <ul className={styles.header_menu_list}>
          <li
            className={styles.header_menu_item}
            onClick={() => {
              scrollTo(scrollRefs.userSection);
            }}
          >
            {dictionary ? dictionary[localeKey]["aourUsers"] : null}
          </li>
          <li
            className={styles.header_menu_item}
            onClick={() => {
              scrollTo(scrollRefs.projectsSection);
            }}
          >
            {dictionary ? dictionary[localeKey]["galery"] : null}
          </li>
          <li
            className={styles.header_menu_item}
            onClick={() => {
              scrollTo(scrollRefs.aboutUs);
            }}
          >
            {dictionary ? dictionary[localeKey]["aboutUs"] : "ჩვენს შესახებ"}
          </li>
        </ul>
        <div className={styles.header_menu_switch_language}>
          <span
            className={styles.switch_language_button}
            onClick={() => {
              switchLanguage(localeContextObject.setLocaleKey);
            }}
          >
            {localeKey}
          </span>
        </div>
        <Button
          name={
            dictionary ? dictionary[localeKey]["contactUs"] : "დაგვიკავშირდით"
          }
        />
      </div>
    </div>
  );
};

export default Header;
