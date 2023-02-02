import styles from "./message.module.css";
import Button from "../button/button.component";

const Message = (props: any) => {
  return (
    <div className={styles.message_conteiner}>
      <div className={styles.message_body_conteiner}>
        <p className={styles.message_body}>{props?.confirmProps?.question}</p>
      </div>
      <div className={styles.message_button_conteiner}>
        <Button name="ok" hendler={props?.confirmProps?.cancelHendler} />
      </div>
    </div>
  );
};

export default Message;
