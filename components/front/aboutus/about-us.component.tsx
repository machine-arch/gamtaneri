import styles from "./about-us.module.css";
import Image from "next/image";
import {
  ScrollContext,
  scrollContextInterface,
} from "../../../context/scroll-context";
import { createRef, RefObject, useContext } from "react";

const AboutUs = () => {
  const imagesStyle = { borderRadius: "8px", overflow: "hidden" };
  const aboutUs: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  scrollContext.aboutUs = aboutUs;
  return (
    <div className={styles.about_us_conteiner} ref={aboutUs}>
      <div className={styles.about_us_image} style={imagesStyle}>
        <Image
          src="/images/about-us.jpg"
          alt="about-us"
          width={600}
          height={500}
          sizes="100vw"
        />
      </div>
      <div className={styles.about_us_text}>
        <h2>ჩვენს შესახებ</h2>
        <p>
          „ნარჩენების მართვის კომპანია გამტანერი“ შეიქმნა ნარჩენების მართვის
          სფეროში მნიშვნელოვანი ცვლილებების განსახორციელებლად. გამტანერები
          ინტენსიურად იმუშავებენ ნარჩენის წარმომქმნელებთან. თანამშრომლობის
          მთავარი მიზანი არის არა მხოლოდ ნარჩენის გატანა, არამედ ცნობიერების
          ამაღლება ნარჩენების მეორადი გამოყენების შესახებ. ნარჩენების სასარგებლო
          რესურსად გარდაქმნა ჩვენი ქვეყნისთვის იქნება უდიდესი წინგადადგმული
          ნაბიჯი ეკოლოგიის და ეკონომიკის კუთხით. ასეთი მიდგომა წარმომქმნელებს
          შეუმცირებს ნარჩენის მოცილების ხარჯს სეპარირებული რესურსიდან მიღებული
          შემოსავლით.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;