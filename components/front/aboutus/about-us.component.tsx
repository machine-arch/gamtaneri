import styles from "./about-us.module.css";
import Image from "next/image";
import {
  ScrollContext,
  scrollContextInterface,
} from "../../../context/scroll-context";
import { createRef, RefObject, useContext, useEffect, useState } from "react";
import { localeContext } from "../../../context/locale-context";
import { imageLoaderProp } from "../../../utils/app.util";

const AboutUs = (props: any) => {
  const imagesStyle = { borderRadius: "8px", overflow: "hidden" };
  const aboutUs: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  scrollContext.aboutUs = aboutUs;
  const { localeKey } = useContext<any>(localeContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);
  return (
    <div className={styles.about_us_conteiner} ref={aboutUs}>
      <div className={styles.about_us_image} style={imagesStyle}>
        <Image
          src={data?.image}
          alt="about-us"
          width={600}
          height={500}
          sizes="100vw"
          loader={imageLoaderProp}
        />
      </div>
      <div className={styles.about_us_text}>
        <h2>{localeKey === "en" ? data?.title_eng : data?.title}</h2>
        <p>{localeKey === "en" ? data?.description_eng : data?.description}</p>
      </div>
    </div>
  );
};

export default AboutUs;
