import { Fragment, useEffect, useState } from "react";
import styles from "./gallery.module.css";
import Image from "next/image";
import { imageLoaderProp } from "../../../utils/app.util";

const Gallery = (props: any) => {
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    setMainImage(JSON.parse(props.currentproject.images)[0]);
  }, [props.currentproject.images]);

  const changeMainImage = (image: string, e: any) => {
    e.currentTarget.classList.add(styles.active_galery_item);
    e.currentTarget.parentElement.childNodes.forEach((item: any) => {
      if (item !== e.currentTarget) {
        item.classList.remove(styles.active_galery_item);
      }
    });

    /* swipe effect */
    const galleryImageMain = document.querySelector(
      `.${styles.gallery_main_image}`
    ) as HTMLElement;

    galleryImageMain.classList.add(styles.gallery_main_image_swipe);
    setTimeout(() => {
      setMainImage(image);
      galleryImageMain.classList.remove(styles.gallery_main_image_swipe);
    }, 500);
  };

  return (
    <Fragment>
      <div className={styles.gallery_conteiner}>
        <div className={styles.gallery_image_main_conteiner}>
          <Image
            src={mainImage}
            alt="gallery_main_image"
            objectFit="cover"
            layout="fill"
            priority={true}
            loader={imageLoaderProp}
            className={styles.gallery_main_image}
          />
        </div>
        <div className={styles.gallery_images_conteiner}>
          <div className={styles.gallery_images}>
            {props?.currentproject?.images
              ? JSON.parse(props?.currentproject?.images).map(
                  (image: any, index: number) => {
                    return index === 0 ? (
                      <div
                        key={index}
                        className={
                          (styles.gallery_images_item,
                          styles.active_galery_item)
                        }
                        onClick={(e) => changeMainImage(image, e)}
                      >
                        <Image
                          src={image}
                          alt="gallery_image"
                          width={60}
                          height={60}
                          objectFit="fill"
                          loader={imageLoaderProp}
                          className={styles.gallery_image}
                        />
                      </div>
                    ) : (
                      <div
                        key={index}
                        className={styles.gallery_images_item}
                        onClick={(e) => changeMainImage(image, e)}
                      >
                        <Image
                          src={image}
                          alt="gallery_image"
                          width={60}
                          height={60}
                          objectFit="fill"
                          loader={imageLoaderProp}
                          className={styles.gallery_image}
                        />
                      </div>
                    );
                  }
                )
              : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Gallery;
