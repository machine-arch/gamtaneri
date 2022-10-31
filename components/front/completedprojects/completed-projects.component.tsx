import styles from "./completed-projects.module.css";
import Carousel from "nuka-carousel/lib/carousel";
import { CaruselConfig } from "../../../config/global.config";
import Image from "next/image";
import { RefObject, useContext, createRef, useState, useEffect } from "react";
import {
  ScrollContext,
  scrollContextInterface,
} from "../../../context/scroll-context";
import { localeContext } from "../../../context/locale-context";

const CompletedProjects = (props: any) => {
  const imagesStyle = { borderRadius: "8px", overflow: "hidden" };
  const projectsSection: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  scrollContext.projectsSection = projectsSection;
  const { localeKey } = useContext<any>(localeContext);
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    setProjects(props.projects);
  }, [props.projects]);

  const openProjectHendler = () => {
    props.setismodalopen(true);
    props.setModalKey("GALLERY");
  };
  return (
    <div
      className={styles.completed_projects_conteiner}
      ref={projectsSection}
      id="completed_projects"
    >
      <Carousel
        adaptiveHeight={true}
        defaultControlsConfig={CaruselConfig}
        slidesToShow={3}
        renderCenterLeftControls={() => null}
        renderCenterRightControls={() => null}
      >
        {projects
          ? projects.map((project: any) => {
              return (
                <div
                  key={project.id}
                  className={styles.copleted_project}
                  onClick={openProjectHendler}
                >
                  <div
                    className={styles.completed_project_image}
                    style={imagesStyle}
                  >
                    <Image
                      src={"/uploads/project_one.jpg"}
                      alt={
                        localeKey === "en"
                          ? project.project_name_eng
                          : project.project_name
                      }
                      width={300}
                      height={150}
                      sizes="100vw"
                      layout="responsive"
                      priority={true}
                    />
                    <h2>
                      {localeKey === "en"
                        ? project.description_eng
                        : project.description}
                    </h2>
                  </div>
                </div>
              );
            })
          : null}
      </Carousel>
    </div>
  );
};

export default CompletedProjects;
