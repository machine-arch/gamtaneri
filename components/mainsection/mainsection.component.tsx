import { NextComponentType } from "next";
import styles from "./mainsection.module.css";
import Button from "../button/button.component";
import Image from "next/image";

const Mainsection: NextComponentType = () => {
  return (
    <div className={styles.mainsection_conteiner}>
      <div className={styles.mainsection_contact_conteiner}>
        <h1 className={styles.mainsection_contact_title}>გამტანერი</h1>
        <p className={styles.mainsection_contact_text}>
          ნარჩენების მართვის კომპანია „გამტანერის“ მთავარი ფასეულობა უხვად
          დაგროვილი თეორიული ცოდნისა და პრაქტიკული გამოცდილების მარაგია.{" "}
        </p>
        <Button />
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
