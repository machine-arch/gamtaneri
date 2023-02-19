import { FC, useContext, useEffect, useRef, useState } from "react";
import { localeContext } from "../../../context/locale-context";
import styles from "./all-users.module.css";
import { createDate, httpRequest } from "../../../utils/app.util";
import { dataContext } from "../../../context/data.context";
import Image from "next/image";
import { imageLoaderProp } from "../../../utils/app.util";

const AllUsers: FC<any> = (props: any) => {
  const { state, dispatch } = useContext<any>(dataContext);
  const from = useRef(10);
  const count = useRef(10);
  const wasFatcched = useRef(false);
  const { localeKey } = useContext<any>(localeContext);

  useEffect(() => {
    document.addEventListener("scroll", getMooreUsers);
  }, []);

  const getMooreUsers = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !wasFatcched.current
    ) {
      console.log("jerjerobit metia");
      wasFatcched.current = true;
      httpRequest(
        `http://localhost:3000/api/client/users/getall?from=${from.current}&count=${count.current}`,
        "GET"
      )
        .then((res) => {
          dispatch({ type: "SET_USERS", payload: res?.resource });
          from.current += count.current;
          return res;
        })
        .then((res) => {
          if (res?.total > from.current) {
            wasFatcched.current = false;
          } else {
            window.removeEventListener("scroll", () => {});
            return false;
          }
        });
    }
  };

  return (
    <div className={styles.all_users_conteiner}>
      <div className={styles.all_users_filter_conteiner}>
        <input
          type="text"
          name="user_filter"
          className="user_filter"
          placeholder="მოძებნე სახელით ან თარიღით..."
        />
        <div className={styles.search_ico_conteiner}>
          <Image
            className={styles.search_ico}
            src="/images/search-ico.svg"
            alt="search icon"
            width={15}
            height={15}
            loader={imageLoaderProp}
          />
        </div>
      </div>
      <div className={styles.all_users_cards_conteiner}>
        {state.users.map((user: any) => {
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
