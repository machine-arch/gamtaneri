import Carousel from "nuka-carousel";
import { FC, useEffect, useState } from "react";
import { CaruselConfig } from "../../../config/global.config";
import Image from "next/image";
import { imageLoaderProp } from "../../../utils/app.util";
import styles from "./completed-projects.module.css";

const ProjectDetal: FC<any> = (props: any) => {
  const [project, setProject] = useState(null);
  useEffect(() => {
    setProject(props?.project ? JSON.parse(props?.project) : []);
  }, [props.project]);

  return (
    <>
      <section>
        <Carousel
          adaptiveHeight={true}
          defaultControlsConfig={CaruselConfig}
          slidesToShow={1}
          renderCenterLeftControls={() => null}
          renderCenterRightControls={() => null}
          // autoplay={true}
          dragging={true}
        >
          {project?.images.map((item: any, index: number) => {
            return (
              <Image
                key={index}
                src={item}
                alt={props.project.project_name}
                width="200"
                height="200"
                loader={imageLoaderProp}
              />
            );
          })}
        </Carousel>
      </section>
    </>
  );
};

export default ProjectDetal;
