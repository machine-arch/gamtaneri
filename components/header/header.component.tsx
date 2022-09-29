import { NextComponentType } from "next";
import Image from "next/image";
import styles from "./header.module.css";
import Button from "../button/button.component";
import {
  ScrollContext,
  scrollContextInterface,
} from "../../context/scroll-context";
import { RefObject, useContext, useEffect, useState } from "react";
const Header: NextComponentType = () => {
  const [context, setContext]: any = useState({});
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  useEffect(() => {
    setContext(scrollContext);
  }, [scrollContext, context]);
  console.log(context);

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
          scrollTo(context.mainSection);
        }}
      >
        <Image src="/images/logo.svg" alt="main logo" width={180} height={30} />
      </div>
      <div className={styles.header_menu}>
        <ul className={styles.header_menu_list}>
          <li
            className={styles.header_menu_item}
            onClick={() => {
              scrollTo(context.userSection);
            }}
          >
            ჩვენი მომხმარებლები
          </li>
          <li
            className={styles.header_menu_item}
            onClick={() => {
              scrollTo(context.projectsSection);
            }}
          >
            გალერეა
          </li>
          <li
            className={styles.header_menu_item}
            onClick={() => {
              scrollTo(context.aboutUs);
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
