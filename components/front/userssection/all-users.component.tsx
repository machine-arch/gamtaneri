import { FC, useContext, useEffect, useState } from "react";
import { localeContext } from "../../../context/locale-context";
import styles from "./all-users.module.css";
import { createDate } from "../../../utils/app.util";

const AllUsers: FC<any> = (props: any) => {
  const [users, setUsers] = useState([]);
  const { localeKey } = useContext<any>(localeContext);

  useEffect(() => {
    setUsers(props?.users);
  }, [props?.users]);
  return (
    <div className={styles.all_users_conteiner}>
      <div className={styles.all_users_cards_conteiner}>
        {users.map((user) => {
          return (
            <div key={user.id} className={styles.user_card}>
              <div className={styles.user_name_conteiner}>
                <h1 className={styles.user_name}>
                  {localeKey === "en" ? user?.title_eng : user?.title}
                </h1>
              </div>
              <div className={styles.user_cooperation_date_conteiner}>
                <span className={styles.user_cooperation_date}>
                  {createDate(user?.createdAt)}
                </span>
              </div>
              <div className={styles.user_cooperation_description_conteiner}>
                <span className={styles.user_cooperation_description}>
                  {localeKey === "en"
                    ? user?.description
                    : user?.description_eng}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUsers;
