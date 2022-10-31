import { Fragment, useState } from "react";
import styles from "./gallery.module.css";
import Image from "next/image";

const Gallery = () => {
  const [mainImage, setMainImage] = useState("");
  return (
    <Fragment>
      <div className={styles.gallery_conteiner}>
        <div className={styles.gallery_image_main_conteiner}>
          <Image
            src={mainImage}
            alt="gallery_main_image"
            width={700}
            height={550}
          />
        </div>
        <div className={styles.gallery_images_conteiner}>
          <div className={styles.gallery_images_item}>
            <Image
              src={mainImage}
              alt="gallery_main_image"
              width={700}
              height={550}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Gallery;
