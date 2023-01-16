import styles from "./all-projects.module.css";
import Image from "next/image";
import { imageLoaderProp } from "../../../utils/app.util";

const AllProjects = () => {
  return (
    <div className={styles.all_projects_conteiner}>
      <div className={styles.project_card}>
        <div className={styles.project_card_title}>
          <h1>Project Title</h1>
        </div>
        <div className={styles.project_card_image}>
          <Image
            src="/images/project_one.jpg"
            alt="test"
            width={100}
            height={100}
            loader={imageLoaderProp}
          />
        </div>
        <div className={styles.project_card_description}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae, voluptatum, quod, voluptas quibusdam voluptates necessitatibus
            quidem voluptate quos quia nesciunt. Quisquam
          </p>
        </div>
        <div className={styles.project_card_button}>
          <button>Read More</button>
        </div>
      </div>
      <div className={styles.project_card}>
        <div className={styles.project_card_title}>
          <h1>Project Title</h1>
        </div>
        <div className={styles.project_card_image}>
          <Image
            src="/images/project_one.jpg"
            alt="test"
            width={100}
            height={100}
            loader={imageLoaderProp}
          />
        </div>
        <div className={styles.project_card_description}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae, voluptatum, quod, voluptas quibusdam voluptates necessitatibus
            quidem voluptate quos quia nesciunt. Quisquam
          </p>
        </div>
        <div className={styles.project_card_button}>
          <button>Read More</button>
        </div>
      </div>
      <div className={styles.project_card}>
        <div className={styles.project_card_title}>
          <h1>Project Title</h1>
        </div>
        <div className={styles.project_card_image}>
          <Image
            src="/images/project_one.jpg"
            alt="test"
            width={100}
            height={100}
            loader={imageLoaderProp}
          />
        </div>
        <div className={styles.project_card_description}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae, voluptatum, quod, voluptas quibusdam voluptates necessitatibus
            quidem voluptate quos quia nesciunt. Quisquam
          </p>
        </div>
        <div className={styles.project_card_button}>
          <button>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
