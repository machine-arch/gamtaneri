import { NextComponentType } from "next";
import styles from "./userssection.module.css";
import React from "react";
import Carousel from "nuka-carousel/lib/carousel";
import { CaruselConfig } from "../../config/global.config";

const UsersSection: NextComponentType = () => {
  return (
    <div className={styles.userssection_conteiner}>
      <div className={styles.userssection_title}>
        <p>ჩვენი მომხმარებლები</p>
      </div>
      <Carousel
        adaptiveHeight={true}
        defaultControlsConfig={CaruselConfig}
        renderCenterLeftControls={({}) => null}
        renderCenterRightControls={({}) => null}
      >
        <div className={styles.userssection_item}>
          <div className={styles.current_user}>
            <h1>დასახელება</h1>
            <span>10.11.2022</span>
            <p>
              ნარჩენების მართვის კომპანია „გამტანერის“ მთავარი ფასეულობა უხვად
              დაგროვილი თეორიული ცოდნისა და პრაქტიკული გამოცდილების მარაგია.
            </p>
          </div>
          <div className={styles.current_user}>
            <h1>დასახელება</h1>
            <span>10.11.2022</span>
            <p>
              ნარჩენების მართვის კომპანია „გამტანერის“ მთავარი ფასეულობა უხვად
              დაგროვილი თეორიული ცოდნისა და პრაქტიკული გამოცდილების მარაგია.
            </p>
          </div>
          <div className={styles.current_user}>
            <h1>დასახელება</h1>
            <span>10.11.2022</span>
            <p>
              ნარჩენების მართვის კომპანია „გამტანერის“ მთავარი ფასეულობა უხვად
              დაგროვილი თეორიული ცოდნისა და პრაქტიკული გამოცდილების მარაგია.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default UsersSection;
