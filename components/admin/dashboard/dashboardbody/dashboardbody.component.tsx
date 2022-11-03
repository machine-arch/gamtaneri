import styles from "./dashboardbody.module.css";
import Button from "../../../button/button.component";
import { useState, useContext, useEffect } from "react";
import { localeContext } from "../../../../context/locale-context";
import Image from "next/image";

const DashboardBody = (props: any) => {
  const [localeKey, setLocaleKey] = useState("");
  const [dictionary, setDictionary] = useState(null);

  const localeContextObject: any = useContext(localeContext);
  useEffect(() => {
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, [localeContextObject]);

  const openModalHendler = () => {
    props.opendMenuItem
      ? props.setIsModalOpen(true)
      : props.setIsModalOpen(false);
  };

  const PAGE_KEYS = {
    contacts: "contacts",
    about: "aboutus",
    users: "users",
    projects: "projects",
  };
  return (
    <>
      <div className={props.dashboard_body_conteiner}>
        <div className={props.dashboard_body_title_conteiner}>
          <h1 className={props.dashboard_body_title}>{props.title}</h1>
        </div>
        <div className={props.dashboard_body_head_conteiner}>
          {props?.opendMenuItem ? (
            <Button
              name={dictionary ? dictionary[localeKey]["add"] : "დამატება"}
              hendler={openModalHendler}
            />
          ) : null}
        </div>
        <div className={props.dashboard_body_content_conteiner}>
          <div className={props.dashboard_body_content}>
            <div className={styles.content_conteiner}>
              {props?.data && props?.data?.from === PAGE_KEYS.contacts
                ? props?.data?.resource?.map((el: any) => {
                    return (
                      <div
                        key={el.id}
                        className={styles.content_card}
                        itemID={el.id}
                      >
                        <div className={styles.card_header_conteiner}>
                          <div className={styles.tools_conteiner}>
                            <Image
                              src="/images/edit.svg"
                              alt="about_us"
                              width={19}
                              height={19}
                              className={styles.edit}
                              itemID={el.id}
                              datatype={props?.data?.from}
                            />
                          </div>
                        </div>
                        <div className={styles.contact_tools}>
                          <div className={styles.contact_info_address}>
                            <Image
                              src="/images/location_on.svg"
                              alt="location"
                              width={24}
                              height={24}
                              layout="fixed"
                            />
                            <p>
                              {localeKey === "en"
                                ? el?.address_eng
                                : el?.address}
                            </p>
                          </div>
                          <div className={styles.contact_info_emile}>
                            <Image
                              src="/images/email.svg"
                              alt="email"
                              width={24}
                              height={24}
                              layout="fixed"
                            />
                            <p>{el.email}</p>
                          </div>
                          <div className={styles.contact_info_phone}>
                            <Image
                              src="/images/call.svg"
                              alt="call"
                              width={24}
                              height={24}
                              layout="fixed"
                            />
                            <p>{el?.phone}</p>
                          </div>
                        </div>
                        <div className={styles.contac_info_text}>
                          <p>
                            {localeKey === "en"
                              ? el?.description_eng
                              : el?.description}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : props?.data && props?.data?.from === PAGE_KEYS.about
                ? props?.data?.resource?.map((el: any) => {
                    return (
                      <div
                        key={el.id}
                        className={styles.content_card}
                        itemID={el.id}
                      >
                        <div className={styles.card_header_conteiner}>
                          <div className={styles.tools_conteiner}>
                            <Image
                              src="/images/edit.svg"
                              alt="about_us"
                              width={19}
                              height={19}
                              className={styles.edit}
                              itemID={el.id}
                              datatype={props?.data?.from}
                            />
                          </div>
                        </div>
                        <div className={styles.about_image}>
                          <Image
                            src={el?.image}
                            alt="about_us"
                            width={200}
                            height={200}
                            layout="fixed"
                            className={styles.about_image}
                          />
                        </div>
                        <div className={styles.about_text}>
                          <p>
                            {localeKey === "en"
                              ? el.description_eng
                              : el.description}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : props?.data && props?.data?.from === PAGE_KEYS.projects
                ? props?.data?.resource?.map((el: any) => {
                    return (
                      <div
                        key={el.id}
                        className={styles.content_card}
                        itemID={el.id}
                      >
                        <div className={styles.card_header_conteiner}>
                          <div className={styles.tools_conteiner}>
                            <Image
                              src="/images/edit.svg"
                              alt="about_us"
                              width={19}
                              height={19}
                              className={styles.edit}
                              itemID={el.id}
                              datatype={props?.data?.from}
                            />
                            <Image
                              src="/images/close.svg"
                              alt="about_us"
                              width={15}
                              height={15}
                              className={styles.delete}
                              itemID={el.id}
                              datatype={props?.data?.from}
                            />
                          </div>
                        </div>
                        <div className={styles.project_name}>
                          <p>
                            {localeKey === "en"
                              ? el.project_name_eng
                              : el.project_name}
                          </p>
                        </div>
                        <div className={styles.project_image_conteiner}>
                          <Image
                            src={JSON.parse(el?.images)[0]}
                            alt="about_us"
                            layout="fill"
                            className={styles.project_image}
                          />
                        </div>
                      </div>
                    );
                  })
                : props?.data && props?.data?.from === PAGE_KEYS.users
                ? props?.data?.resource?.map((el: any) => {
                    return (
                      <div
                        key={el.id}
                        className={styles.content_card}
                        itemID={el.id}
                      >
                        <div className={styles.card_header_conteiner}>
                          <div className={styles.tools_conteiner}>
                            <Image
                              src="/images/edit.svg"
                              alt="about_us"
                              width={19}
                              height={19}
                              className={styles.edit}
                              itemID={el.id}
                              datatype={props?.data?.from}
                            />
                            <Image
                              src="/images/close.svg"
                              alt="about_us"
                              width={15}
                              height={15}
                              className={styles.delete}
                              itemID={el.id}
                              datatype={props?.data?.from}
                            />
                          </div>
                        </div>
                        <div className={styles.users_title}>
                          <p>{localeKey === "en" ? el.title : el.title_eng}</p>
                        </div>
                        <div className={styles.users_date}>
                          <p>{el.createdAt}</p>
                        </div>
                        <div className={styles.users_description_conteiner}>
                          <p>
                            {localeKey === "en"
                              ? el.description_eng
                              : el.description}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            {(props?.data && props?.data?.from === PAGE_KEYS.users) ||
            (props?.data && props?.data?.from === PAGE_KEYS.projects) ? (
              <div className={styles.pagination_conteiner}>
                <div className={styles.pagination_buttons}>
                  <button className={styles.pagination_button}>1</button>
                  <button className={styles.pagination_button}>2</button>
                  <button className={styles.pagination_button}>3</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBody;
