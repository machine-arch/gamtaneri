import styles from "./completed-projects.module.css";
import Carousel from "nuka-carousel/lib/carousel";
import { CaruselConfig } from "../../config/global.config";
import Image from "next/image";
import { RefObject, useContext, createRef } from "react";
import {
  ScrollContext,
  scrollContextInterface,
} from "../../context/scroll-context";

const CompletedProjects = () => {
  const imagesStyle = { borderRadius: "8px", overflow: "hidden" };
  const projectsSection: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  scrollContext.projectsSection = projectsSection;
  return (
    <div
      className={styles.completed_projects_conteiner}
      ref={projectsSection}
      id="completed_projects"
    >
      <Carousel
        adaptiveHeight={true}
        defaultControlsConfig={CaruselConfig}
        renderCenterLeftControls={() => null}
        renderCenterRightControls={() => null}
      >
        <div className={styles.copleted_projects_items} ref={projectsSection}>
          <div className={styles.copleted_project}>
            <div className={styles.completed_project_image} style={imagesStyle}>
              <Image
                src="/images/project_one.jpg"
                alt="project_one"
                width={300}
                height={150}
                sizes="100vw"
              />
            </div>
            <h2>აგროწარმოების ხელშეწყობის პროგრამა</h2>
          </div>
          <div className={styles.copleted_project}>
            <div className={styles.completed_project_image} style={imagesStyle}>
              <Image
                src="/images/project_one.jpg"
                alt="project_one"
                width={300}
                height={150}
                objectFit="cover"
                sizes="100vw"
              />
            </div>
            <h2>აგროწარმოების ხელშეწყობის პროგრამა</h2>
          </div>
          <div className={styles.copleted_project}>
            <div className={styles.completed_project_image} style={imagesStyle}>
              <Image
                src="/images/project_one.jpg"
                alt="project_one"
                width={300}
                height={150}
                objectFit="cover"
                sizes="100vw"
              />
            </div>
            <h2>აგროწარმოების ხელშეწყობის პროგრამა</h2>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CompletedProjects;
