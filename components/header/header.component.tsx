import { NextComponentType } from "next";
import Image from "next/image";
import styles from "./header.module.css";
import Button from "../button/button.component";

const Header: NextComponentType = () => {
  return (
    <div className={styles.header_conteiner}>
      <div className={styles.header_logo_conteiner}>
        <a href="#" className={styles.header_home_link}>
          <Image
            src="/images/logo.svg"
            alt="main logo"
            width={180}
            height={30}
            layout="intrinsic"
          />
        </a>
      </div>
      <div className={styles.header_menu}>
        <ul className={styles.header_menu_list}>
          <li className={styles.header_menu_item}>ჩვენი მომხმარებლები</li>
          <li className={styles.header_menu_item}>გალერეა</li>
          <li className={styles.header_menu_item}>ჩვენს შესახებ</li>
        </ul>
        <Button />
      </div>
    </div>
  );
};

export default Header;
