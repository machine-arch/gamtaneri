import { FC, useEffect, useState, useContext } from "react";
import { localeContext } from "../../../context/locale-context";
import { FormPropsInterface } from "../../../config/interfaces/app.interfaces";
import Form from "../../form/form.component";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";

const Login: FC = () => {
  const [localeKey, setLocaleKey] = useState("");
  const LocalCntextObject: any = useContext(localeContext);
  const router = useRouter();
  useEffect(() => {
    setLocaleKey(LocalCntextObject.localeKey);
    // const encryptId = (str: string) => {
    //   const ciphertext = AES.encrypt(str, "secretPassphrase");
    //   return encodeURIComponent(ciphertext.toString());
    // };
    // setLogin(encryptId("admin"));
  }, [LocalCntextObject]);

  const body = {
    email: "",
    password: "",
  };
  const loginHendler = async (e: any) => {
    e.preventDefault();
    let params: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    await fetch("http://localhost:3000/api/login", params)
      .then((res) => res.json())
      .then((data) => {
        if (data.user.token && data.user.token !== "") {
          router.push("/");
        }
      });
  };

  const getvalues = (e: any) => {
    e.preventDefault();
    if (e.currentTarget.name === "email") {
      body.email = e.currentTarget.value;
    }
    if (e.currentTarget.name === "password") {
      body.password = e.currentTarget.value;
    }
  };

  const formInputs = [
    {
      id: Math.random().toString(),
      type: "Email",
      name: "email",
      className: "form-input",
      placeholder: LocalCntextObject.dictionary
        ? LocalCntextObject.dictionary[localeKey]["email"]
        : "ელ.ფოსტა",
      needCommonParent: false,
      eventType: "onChange",
      callBack: getvalues,
    },
    {
      id: Math.random().toString(),
      type: "password",
      name: "password",
      className: "form-input",
      placeholder: LocalCntextObject.dictionary
        ? LocalCntextObject.dictionary[localeKey]["password"]
        : "პაროლი",
      needCommonParent: false,
      eventType: "onChange",
      callBack: getvalues,
    },
  ];
  const FomrProps: FormPropsInterface = {
    formClassName: "footer_form",
    inputs: formInputs,
    inputsCommonParentClass: "footer_inputs_common_parent",
    needTextArea: false,
    needButton: true,
    buttonClass: "footer_form_button",
    buttonText: LocalCntextObject.dictionary
      ? LocalCntextObject.dictionary[LocalCntextObject.localeKey]["login"]
      : "შესვლა",
    ButtoncallBack: loginHendler,
  };

  return (
    <>
      <div className={styles.conteiner}>
        <div className={styles.form_conteiner}>
          <Form FormProps={FomrProps} />
        </div>
      </div>
    </>
  );
};

export default Login;
