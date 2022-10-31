import { NextComponentType } from "next";
import styles from "./mainsection.module.css";
import Button from "../../button/button.component";
import Image from "next/image";
import { RefObject, useContext, createRef, useEffect, useState } from "react";
import {
  ScrollContext,
  scrollContextInterface,
} from "../../../context/scroll-context";
import { localeContext } from "../../../context/locale-context";

const Mainsection = (props: any) => {
  const [localeKey, setLocaleKey] = useState("");
  const [dictionary, setDictionary] = useState(null);
  const localeContextObject: any = useContext(localeContext);
  useEffect(() => {
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, [localeContextObject]);
  const mainSection: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  scrollContext.mainSection = mainSection;
  const openModalHeader = () => {
    props.setismodalopen(true);
    props.setModalKey("FORM");
  };
  return (
    <div
      className={styles.mainsection_conteiner}
      id="main_section"
      ref={mainSection}
    >
      <div className={styles.mainsection_contact_conteiner}>
        <h1 className={styles.mainsection_contact_title}>გამტანერი</h1>
        <p className={styles.mainsection_contact_text}>
          ნარჩენების მართვის კომპანია „გამტანერის“ მთავარი ფასეულობა უხვად
          დაგროვილი თეორიული ცოდნისა და პრაქტიკული გამოცდილების მარაგია.{" "}
        </p>
        <Button
          name={
            dictionary ? dictionary[localeKey]["contactUs"] : "დაგვიკავშირდით"
          }
          hendler={openModalHeader}
        />
      </div>
      <div className={styles.mainsection_image_conteiner}>
        <Image
          src="/images/main-grid.png"
          alt="mainsection-grid"
          width={700}
          height={550}
        />
      </div>
    </div>
  );
};

export default Mainsection;
