import { Fragment, useState } from "react";
import styles from "./gallery.module.css";
import Image from "next/image";

const Gallery = (props: any) => {
  const [mainImage, setMainImage] = useState("");
  return (
    <Fragment>
      <div className={styles.gallery_conteiner}>
        <div className={styles.gallery_image_main_conteiner}>
          <Image
            src={
              mainImage ? mainImage : JSON.parse(props.currentproject.images)[0]
            }
            alt="gallery_main_image"
            objectFit="cover"
            layout="fill"
            priority={true}
          />
        </div>
        <div className={styles.gallery_images_conteiner}>
          <div className={styles.gallery_images}>
            <div className={styles.gallery_images_item}>
              <Image
                src={
                  mainImage
                    ? mainImage
                    : JSON.parse(props.currentproject.images)[0]
                }
                alt="gallery_main_image"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Gallery;
