import styles from "./footer.module.css";
import Form from "../../form/form.component";
import Image from "next/image";
import { FC, SyntheticEvent } from "react";
import { FooterProps } from "../../../config/interfaces/app.interfaces";
import { FormPropsInterface } from "../../../config/interfaces/app.interfaces";

const Footer: FC<FooterProps> = (props: any) => {
  const formInputs = [
    {
      id: "001",
      type: "text",
      name: "fullname",
      className: "form-input",
      placeholder: props.dictionary
        ? props.dictionary[props.localeKey]["fullName"]
        : "სახელი და გვარი",
      needCommonParent: true,
    },
    {
      id: "002",
      type: "text",
      name: "phone",
      className: "form-input",
      placeholder: props.dictionary
        ? props.dictionary[props.localeKey]["phone"]
        : "ტელეფონი",
      needCommonParent: true,
    },
    {
      id: "003",
      type: "email",
      name: "email",
      className: "form-input",
      placeholder: props.dictionary
        ? props.dictionary[props.localeKey]["email"]
        : "ელ.ფოსტა",
      needCommonParent: false,
    },
  ];
  const formTextareas = [
    {
      textareaClass: "form_textarea",
      textareaName: "message",
      textareaPlaceholder: props.dictionary
        ? props.dictionary[props.localeKey]["message"]
        : "შეტყობინება",
    },
  ];
  const formProps: FormPropsInterface = {
    formClassName: "form",
    inputs: formInputs,
    inputsCommonParentClass: "inputs_common_parent",
    needTextareas: true,
    textareas: formTextareas,
    needButton: true,
    buttonClass: "form_button",
    buttonText: props.dictionary
      ? props.dictionary[props.localeKey]["send"]
      : "გაგზავნა",
    ButtoncallBack: (e: SyntheticEvent) => {
      e.preventDefault();
      console.log("clicked");
    },
  };
  return (
    <footer className={styles.footer_conteiner}>
      <div className={styles.contact_info_conteiner}>
        <h3>
          {props.dictionary
            ? props.dictionary[props.localeKey]["contact"]
            : "საკონტაქტო"}
        </h3>
        <div className={styles.contact_tools}>
          <div className={styles.contact_info_address}>
            <Image
              src="/images/location_on.svg"
              alt="location"
              width={24}
              height={24}
              layout="fixed"
            />
            <p>Tbilisi,Georgia</p>
          </div>
          <div className={styles.contact_info_emile}>
            <Image
              src="/images/email.svg"
              alt="email"
              width={24}
              height={24}
              layout="fixed"
            />
            <p>example@mail.com</p>
          </div>
          <div className={styles.contact_info_phone}>
            <Image
              src="/images/call.svg"
              alt="call"
              width={24}
              height={24}
              layout="fixed"
            />
            <p>+995 123 321 321</p>
          </div>
        </div>
        <div className={styles.contac_info_text}>
          <p>
            ეკოლოგიური პოლიტიკა და გარემოსდაცვითი ცნობიერების ამაღლება მსოფლიოს
            წამყვანი ქვეყნების ნომერ პირველი ამოცანაა. ერთი შეხედვით „უსარგებლო
            ნარჩენის“ „სასარგებლო რესურსად“ გარდაქმნას შეუძლია მნიშვნელოვნად
            შეამციროს ეკოლოგიური კატასტროფის რისკები. ჩვენს ქვეყანაში ეკო
            მოძრაობა პირველ ნაბიჯებს დგამს, ვითარდება და უფრო გვაახლოვებს
            ევროპულ ღირებულებებთან. სწორედ ასეთი ღირებულებების მატარებელია
            „ნარჩენების მართვის კომპანია გამტანერი“, რომელიც ბაზარზე შემოდის
            ახალი მიდგომებით.
          </p>
        </div>
        <div className={styles.contact_info_termsAndCvonditions}>
          <p>
            {props.dictionary
              ? props.dictionary[props.localeKey]["termsAndConditions"]
              : "წესები და პირობები"}
          </p>
          <p>
            {props.dictionary
              ? props.dictionary[props.localeKey]["allRightsRecevd"]
              : "ყველა უფლება დაცულია"}
          </p>
        </div>
      </div>
      <div className={styles.contact_us}>
        <Form FormProps={formProps} />
      </div>
    </footer>
  );
};

export default Footer;
