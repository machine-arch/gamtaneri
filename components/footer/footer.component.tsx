import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer_conteiner}>
      <div className={styles.contact_info_conteiner}>
        <h3>საკონტაქტო</h3>
        <div className={styles.contact_tools}>
          <div className={styles.contact_info_address}></div>
          <div className={styles.contact_info_emile}></div>
          <div className={styles.contact_info_phone}></div>
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
      <div className={styles.contact_us}></div>
    </footer>
  );
};

export default Footer;
