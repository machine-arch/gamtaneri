import { NextComponentType } from "next";
import styles from "./userssection.module.css";
import React, { createRef, RefObject, useContext } from "react";
import Carousel from "nuka-carousel/lib/carousel";
import { CaruselConfig } from "../../config/global.config";
import {
  ScrollContext,
  scrollContextInterface,
} from "../../context/scroll-context";

const UsersSection: NextComponentType = () => {
  const userSection: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  scrollContext.userSection = userSection;
  return (
    <div
      className={styles.userssection_conteiner}
      ref={userSection}
      id="users_section"
    >
      <div className={styles.userssection_title}>
        <p>ჩვენი მომხმარებლები</p>
      </div>
      <Carousel
        slidesToShow={3}
        adaptiveHeight={true}
        defaultControlsConfig={CaruselConfig}
        renderCenterLeftControls={({}) => null}
        renderCenterRightControls={({}) => null}
      >
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
      </Carousel>
    </div>
  );
};

export default UsersSection;
