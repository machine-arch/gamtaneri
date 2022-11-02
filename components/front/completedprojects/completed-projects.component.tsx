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

  const openProjectHendler = (e) => {
    props.setismodalopen(true);
    props.setModalKey("GALLERY");
    const current_el_id = e.currentTarget.getAttribute("itemID");
    const current_el = projects.find((el: any) => el.id == current_el_id);
    props.setcurrentproject(current_el);
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
        dragging={true}
      >
        {projects
          ? projects.map((project: any) => {
              return (
                <div key={project.id} className={styles.copleted_project}>
                  <div
                    className={styles.completed_project_image_conteiner}
                    style={imagesStyle}
                  >
                    <Image
                      src={JSON.parse(project.images)[0]}
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
                      className={styles.completed_project_image}
                    />
                    <h2 onClick={openProjectHendler} itemID={project.id}>
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
