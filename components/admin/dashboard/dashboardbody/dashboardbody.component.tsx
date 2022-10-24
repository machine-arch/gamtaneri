import styles from "./dashboardbody.module.css";
import Button from "../../../button/button.component";
import { useState, useContext, useEffect } from "react";
import { localeContext } from "../../../../context/locale-context";

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
              {props.data
                ? props.data.map((el) => {
                    return (
                      <div key={el.id} className={styles.content_card}>
                        <h1>{el.title}</h1>
                        <span className={styles.content_date}>
                          {el.createdAt}
                        </span>
                        <div className={styles.content_description}>
                          {el.description}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBody;
