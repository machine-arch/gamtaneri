import styles from "./navbar.module.css";
import { useState } from "react";

const Navbar = (props: any) => {
  const onClickHendler = (e) => {
    if (e.currentTarget.classList.contains(styles.active)) {
      e.currentTarget.classList.remove(styles.active);
      props.setOpendMenuItem(null);
      props.setIsModalOpen(false);
    } else {
      e.currentTarget.classList.add(styles.active);
      [...e.currentTarget.parentElement.children].forEach((el) => {
        if (el !== e.currentTarget) {
          el.classList.remove(styles.active);
        }
      });
      props.setOpendMenuItem(e.currentTarget);
      props.setIsModalOpen(false);
    }
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
