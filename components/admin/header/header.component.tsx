import styles from "./header.module.css";
import Image from "next/image";
import Button from "../../button/button.component";
import { FC, useContext } from "react";
import {
  authContext,
  authContextInterface,
} from "../../../context/admin/auth.context";
import router from "next/router";
import nookies from "nookies";
import { imageLoaderProp } from "../../../utils/app.util";

const Header: FC<any> = () => {
  const autContext: authContextInterface = useContext(authContext);
  const { user, setUser } = autContext;
  const logOutHendler = () => {
    fetch("/api/admin/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Logout success") {
          localStorage.removeItem("_token");
          router.push("/admin/login");
          setUser(null);
        }
      });
  };
  return (
    <>
      <header className={styles.header_conteiner}>
        <div className={styles.header_logo}>
          <Image
            src="/images/logo.svg"
            alt="main logo"
            width={180}
            height={30}
            loader={imageLoaderProp}
          />
        </div>
        <div className={styles.header_menu}>
          <ul className={styles.header_menu_list}>
            <li className={(styles.header_menu_list_item, styles.logout)}>
              <Button name={"log out"} hendler={logOutHendler} />
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
