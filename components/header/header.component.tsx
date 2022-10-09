import { NextComponentType } from "next";
import Image from "next/image";
import styles from "./header.module.css";
import Button from "../button/button.component";
import {
  ScrollContext,
  scrollContextInterface,
} from "../../context/scroll-context";
import { useContext, useEffect, useState } from "react";
import {
  localeContextInterface,
  localeContext,
} from "../../context/locale-context";
const Header: NextComponentType = () => {
  const [scrollRefs, setScrollRefs] = useState(null);
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  const localeContextObject: localeContextInterface = useContext(localeContext);
  useEffect(() => {
    setScrollRefs(scrollContext);
    console.log(localeContextObject);
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
            ჩვენი მომხმარებლები
          </li>
          <li
            className={styles.header_menu_item}
            onClick={() => {
              scrollTo(scrollRefs.projectsSection);
            }}
          >
            გალერეა
          </li>
          <li
            className={styles.header_menu_item}
            onClick={() => {
              scrollTo(scrollRefs.aboutUs);
            }}
          >
            ჩვენს შესახებ
          </li>
        </ul>
        <Button />
      </div>
    </div>
  );
};

export default Header;
