import { FC, useEffect, useState, useContext, useRef } from "react";
import { localeContext } from "../../../context/locale-context";
import { FormPropsInterface } from "../../../config/interfaces/app.interfaces";
import Form from "../../form/form.component";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";

import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import { authContext } from "../../../context/admin/auth.context";

const Login: FC = () => {
  const [localeKey, setLocaleKey] = useState("");
  const LocalCntextObject: any = useContext(localeContext);
  const [dictionary, setDictionary] = useState(null);
  const [needLoader, setNeedLoader] = useState(false);
  const needRedairect = useRef(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const isVeriyfied = useRef(false);
  const authContextObject: any = useContext(authContext);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (!isVeriyfied.current) {
        isVeriyfied.current = true;
        setLocaleKey(LocalCntextObject.localeKey);
        setDictionary(LocalCntextObject.dictionary);
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
            .then(async (res) => await res.json())
            .then(async (data) => {
              if ((await data) && (await data.isValid)) {
                authContextObject.setUser(data.user);
                needRedairect.current = true;
                setShowSpinner(false);
              } else {
                setShowSpinner(false);
              }
            })
            .catch((err) => {
              throw err;
            })
            .finally(() => {
              setShowSpinner(false);
            });
        } else {
          setShowSpinner(false);
        }
      }
    })();
  }, [LocalCntextObject, authContextObject, showSpinner]);
  if (needRedairect.current) {
    router.push("/admin/dashboard");
  } else {
    const requestBody = {
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
        body: JSON.stringify(requestBody),
      };
      setNeedLoader(true);
      await fetch("http://localhost:3000/api/admin/login", params)
        .then((res) => res.json())
        .then((data) => {
          setNeedLoader(false);
          if (data.user && data.user.token && data.user.token !== "") {
            const token = AES.encrypt(data.user.token, "secretPassphrase");
            localStorage.setItem("_token", token.toString());
            authContextObject.setUser(data.user);
            router.push("/admin/dashboard");
          }
        });
    };

    const getvalues = (e: any) => {
      e.preventDefault();
      if (e.currentTarget.name === "email") {
        requestBody.email = e.currentTarget.value;
      }
      if (e.currentTarget.name === "password") {
        requestBody.password = e.currentTarget.value;
      }
    };

    const formInputs = [
      {
        id: Math.random().toString(),
        type: "Email",
        name: "email",
        className: "form-input",
        placeholder: dictionary ? dictionary[localeKey]["email"] : "ელ.ფოსტა",
        needCommonParent: false,
        eventType: "onChange",
        callBack: getvalues,
      },
      {
        id: Math.random().toString(),
        type: "password",
        name: "password",
        className: "form-input",
        placeholder: dictionary ? dictionary[localeKey]["password"] : "პაროლი",
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

    if (showSpinner) {
      return (
        <div className={styles.login_spiner_conteiner}>
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={showSpinner}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      );
    } else {
      return (
        <>
          <div className={styles.conteiner}>
            <div className={styles.form_conteiner}>
              <h1 className={styles.login_form_title}>შესვლა</h1>
              <Form
                FormProps={FomrProps}
                Loader={needLoader}
                loadrConteinerClassname={styles.form_loader_conteiner}
              />
            </div>
          </div>
        </>
      );
    }
  }
};

export default Login;
