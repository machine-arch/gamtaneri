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

const UsersSection = (props: any) => {
  const userSection: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  scrollContext.userSection = userSection;
  const [users, setUsers] = useState(null);
  const { localeKey } = useContext<any>(localeContext);
  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  return (
    <div
      className={styles.userssection_conteiner}
      ref={userSection}
      id="users_section"
    >
      <div className={styles.userssection_title}>
        <p>ჩვენი მომხმარებლები</p>
      </div>
      <Carousel
        slidesToShow={3}
        adaptiveHeight={true}
        defaultControlsConfig={CaruselConfig}
        renderCenterLeftControls={({}) => null}
        renderCenterRightControls={({}) => null}
      >
        {users
          ? users.map((user: any) => {
              return (
                <div key={user.id} className={styles.current_user}>
                  <h1>{localeKey === "en" ? user.title_eng : user.title}</h1>
                  <span>{user.createdAt}</span>
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
