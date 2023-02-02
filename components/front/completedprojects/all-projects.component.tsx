import styles from "./all-projects.module.css";
import Image from "next/image";
import { imageLoaderProp } from "../../../utils/app.util";
import { useState, useEffect, useContext } from "react";
import { localeContext } from "../../../context/locale-context";
import router from "next/router";
import { httpRequest } from "../../../utils/app.util";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const { localeKey } = useContext<any>(localeContext);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    const projects = await httpRequest("api/client/projects/getall", "GET");
    setProjects(projects.resource);
  };

  const seeProjectDetals = (e: any) => {
    const _this = e.currentTarget;
    const itemID = _this.getAttribute("itemID");
    router.push(`/projects/${itemID}`);
  };

  return (
    <div className={styles.all_projects_conteiner}>
      {projects.map((project, index) => {
        return (
          <div className={styles.project_card} key={project.id}>
            <div className={styles.project_card_title}>
              <h1>
                {localeKey === "en"
                  ? project.project_name_eng
                  : project.project_name}
              </h1>
            </div>
            <div className={styles.project_card_image}>
              <Image
                src={JSON.parse(project?.images)[0]}
                alt={
                  localeKey === "en"
                    ? project.project_name_eng
                    : project.project_name
                }
                width={20}
                height={10}
                sizes="100vw"
                loader={imageLoaderProp}
              />
            </div>
            <div className={styles.project_card_description}>
              <p>
                {localeKey === "en"
                  ? project.description_eng
                  : project.description}
              </p>
            </div>
            <div className={styles.project_card_button}>
              <a
                className={styles.all_project_read_moore}
                itemID={project.id}
                onClick={seeProjectDetals}
              >
                Read More
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllProjects;
