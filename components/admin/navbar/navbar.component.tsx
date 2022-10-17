import styles from "./navbar.module.css";
import { useState } from "react";

const Navbar = (props: any) => {
  const onClickHendler = (e) => {
    e.currentTarget.classList.toggle(styles.active);
    [...e.currentTarget.parentElement.children].forEach((el) => {
      if (el !== e.currentTarget) {
        el.classList.remove(styles.active);
      }
      props.setOpendMenuItem(e.currentTarget);
    });
  };
  return (
    <>
      <div className={styles.navbar_conteiner}>
        <ul className={styles.navbar_menu_list}>
          <li
            className={styles.navbar_menu_list_item}
            onClick={onClickHendler}
            datatype="our_users"
          >
            <a>ჩვენი მომხმარებლები</a>
          </li>
          <li
            className={styles.navbar_menu_list_item}
            onClick={onClickHendler}
            datatype="complated_projects"
          >
            <a>დასრულებული პროექტები</a>
          </li>
          <li
            className={styles.navbar_menu_list_item}
            onClick={onClickHendler}
            datatype="about_us"
          >
            <a>ჩვენს შესახებ</a>
          </li>
          <li
            className={styles.navbar_menu_list_item}
            onClick={onClickHendler}
            datatype="contact"
          >
            <a>კონტაქტი</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
