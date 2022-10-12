import { FC, useEffect, useState } from "react";
import styles from "./login.module.css";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";

const Login: FC = () => {
  const [login, setLogin] = useState("");
  useEffect(() => {
    const encryptId = (str: string) => {
      const ciphertext = AES.encrypt(str, "secretPassphrase");
      return encodeURIComponent(ciphertext.toString());
    };
    setLogin(encryptId("admin"));
  }, []);
  return (
    <>
      <h1>{login}</h1>
    </>
  );
};

export default Login;
