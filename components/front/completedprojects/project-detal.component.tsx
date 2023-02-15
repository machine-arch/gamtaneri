import Carousel from "nuka-carousel";
import { FC, Fragment, useEffect, useState } from "react";
import { CaruselConfig } from "../../../config/global.config";
import Image from "next/image";
import { imageLoaderProp } from "../../../utils/app.util";
import styles from "./projects-detal.module.css";
import parse from "html-react-parser";

const ProjectDetal: FC<any> = (props: any) => {
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  useEffect(() => {
    setProject(props.project ? props.project : {});
    setImages(JSON.parse(props?.project?.images));
  }, [props.project]);

  const description: string =
    props.localeKey === "en" ? project?.description_eng : project?.description;

  return (
    <Fragment>
      <section className={styles.project_detal_slider_section}>
        <Carousel
          adaptiveHeight={true}
          defaultControlsConfig={CaruselConfig}
          slidesToShow={1}
          renderCenterLeftControls={() => null}
          renderCenterRightControls={() => null}
          // autoplay={true}
          dragging={true}
        >
          {images.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={styles.project_detal_slider_image_conteiner}
              >
                <Image
                  src={item}
                  alt={props.project.project_name}
                  width={30}
                  height={20}
                  sizes="100vw"
                  loader={imageLoaderProp}
                  className={styles.project_detal_slider_image}
                />
              </div>
            );
          })}
        </Carousel>
      </section>
      <section className={styles.project_detal_description_section}>
        <div className={styles.project_detal_description_card_conteiner}>
          <div className={styles.project_detal_description_card}>
            <div
              className={styles.project_detal_description}
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ProjectDetal;
