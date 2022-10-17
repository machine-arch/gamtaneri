import router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../../context/admin/auth.context";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import Header from "../header/header.component";
import Navbar from "./../navbar/navbar.component";
import styles from "./dashboard.module.css";

const Home = () => {
  const authContextObject: any = useContext(authContext);
  const [needRedirect, setNeedRedirect] = useState(false);
  const [opendMenuItem, setOpendMenuItem] = useState(null);
  const isVeriyfied = useRef(false);
  useEffect(() => {
    (async () => {
      if (!isVeriyfied.current) {
        isVeriyfied.current = true;
        if (localStorage.getItem("_token")) {
          await fetch("/api/admin/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: AES.decrypt(
                localStorage.getItem("_token"),
                "secretPassphrase"
              ).toString(enc.Utf8),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data && !data.isValid) {
                setNeedRedirect(true);
              } else if (data && data.isValid) {
                authContextObject.setUser(data.user);
              }
            })
            .catch((err) => {
              throw err;
            });
        } else {
          setNeedRedirect(true);
        }
      }
    })();
  }, [authContextObject]);
  if (needRedirect) {
    router.push("/admin/login");
  } else {
    console.log(opendMenuItem?.getAttributes("datatype"));
    return (
      <div>
        <Header />
        <div className={styles.dashboard_body_conteiner}>
          <Navbar setOpendMenuItem={setOpendMenuItem} />
          <div className={styles.dashboard_body}></div>
        </div>
      </div>
    );
  }
};

export default Home;
