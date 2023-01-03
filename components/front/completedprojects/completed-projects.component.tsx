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
import { imageLoaderProp } from "../../../utils/app.util";

const CompletedProjects = (props: any) => {
  const imagesStyle = { borderRadius: "8px", overflow: "hidden" };
  const projectsSection: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  scrollContext.projectsSection = projectsSection;
  const { localeKey } = useContext<any>(localeContext);
  const [projects, setProjects] = useState(null);
  const [sliedToShow, setSlideToShow] = useState(3);
  useEffect(() => {
    setProjects(props.projects);
    slideToshow();
  }, [props.projects]);

  const openProjectHendler = (e: any) => {
    props.setismodalopen(true);
    props.setModalKey("GALLERY");
    const current_el_id = e.currentTarget.getAttribute("itemID");
    const current_el = projects.find((el: any) => el.id == current_el_id);
    props.setcurrentproject(current_el);
    props?.setModalTitle(current_el.project_name);
  };
  const slideToshow = () => {
    if (window.outerWidth < 900) {
      setSlideToShow(1);
    } else {
      setSlideToShow(3);
    }
  };
  const loadOnleyImages: any = async () => {
    const images = await Promise.all(
      projects.map((project: any) => {
        return JSON.parse(project?.images).map((image: any) => {
          return imageLoaderProp({ src: image, width: 30, quality: 75 });
        });
      })
    );
    return images;
  };
  return (
    <div
      className={styles.completed_projects_conteiner}
      ref={projectsSection}
      id="completed_projects"
    >
      <div className={styles.projects_title}>
        <p>დასრულებული პროექტები</p>
      </div>
      <Carousel
        adaptiveHeight={true}
        defaultControlsConfig={CaruselConfig}
        slidesToShow={sliedToShow}
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
                      src={JSON.parse(project?.images)[0]}
                      alt={
                        localeKey === "en"
                          ? project.project_name_eng
                          : project.project_name
                      }
                      width={30}
                      height={20}
                      sizes="100vw"
                      priority={true}
                      unoptimized={true}
                      loader={loadOnleyImages}
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
