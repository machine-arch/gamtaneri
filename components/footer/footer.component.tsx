import styles from "./footer.module.css";
import Form from "../form/form.component";
import Image from "next/image";

const Footer = () => {
  const formInputs = [
    {
      id: "001",
      type: "text",
      name: "fullname",
      className: "form-input",
      placeholder: "სახელი და გვარი",
      needCommonParent: true,
    },
    {
      id: "002",
      type: "text",
      name: "phone",
      className: "form-input",
      placeholder: "ტელეფონის ნომერი",
      needCommonParent: true,
    },
    {
      id: "003",
      type: "email",
      name: "email",
      className: "form-input",
      placeholder: "ელ.ფოსტა",
      needCommonParent: false,
    },
  ];
  const formTextarea = {
    textareaClass: "footer_form_textarea",
    textareaName: "message",
    textareaPlaceholder: "შეტყობინება",
  };
  const formProps = {
    formClassName: "footer_form",
    inputs: formInputs,
    inputsCommonParentClass: "footer_inputs_common_parent",
    needTextArea: true,
    ...formTextarea,
    needButton: true,
    buttonClass: "footer_form_button",
    buttonText: "გაგზავნა",
  };
  return (
    <footer className={styles.footer_conteiner}>
      <div className={styles.contact_info_conteiner}>
        <h3>საკონტაქტო</h3>
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
          <p>წესები და პირობები</p>
          <p>ყველა უფლება დაცულია</p>
        </div>
      </div>
      <div className={styles.contact_us}>
        <Form formProps={formProps} />
      </div>
    </footer>
  );
};

export default Footer;
