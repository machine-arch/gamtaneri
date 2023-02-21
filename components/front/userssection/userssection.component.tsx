import styles from "./userssection.module.css";
import React, {
  createRef,
  RefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import Carousel from "nuka-carousel/lib/carousel";
import { CaruselConfig } from "../../../config/global.config";
import {
  ScrollContext,
  scrollContextInterface,
} from "../../../context/scroll-context";
import { localeContext } from "../../../context/locale-context";
import Link from "next/link";
import { createDate } from "../../../utils/app.util";

const UsersSection = (props: any) => {
  const userSection: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  scrollContext.userSection = userSection;
  const [users, setUsers] = useState(null);
  const [sliedToShow, setSlideToShow] = useState(3);
  const { localeKey } = useContext<any>(localeContext);
  useEffect(() => {
    setUsers(props.users);
    slideToshow();
  }, [props.users]);

  const slideToshow = () => {
    if (window.outerWidth < 900) {
      setSlideToShow(1);
    } else {
      setSlideToShow(3);
    }
  };

  return (
    <div
      className={styles.userssection_conteiner}
      ref={userSection}
      id="users_section"
    >
      <div className={styles.userssection_title}>
        <p>ჩვენი მომხმარებლები</p>
        <Link href="/users" passHref>
          <span className={styles.our_users_see_all}>ყველა</span>
        </Link>
      </div>
      <Carousel
        slidesToShow={sliedToShow}
        adaptiveHeight={true}
        defaultControlsConfig={CaruselConfig}
        renderCenterLeftControls={({}) => null}
        renderCenterRightControls={({}) => null}
        // autoplay={true}
      >
        {users
          ? users.map((user: any) => {
              return (
                <div key={user.id} className={styles.current_user}>
                  <h1>{localeKey === "en" ? user.title_eng : user.title}</h1>
                  <span>{createDate(user.createdAt)}</span>
                  <p>
                    {localeKey === "en"
                      ? user.description_eng
                      : user.description}
                  </p>
                </div>
              );
            })
          : null}
      </Carousel>
    </div>
  );
};

export default UsersSection;
