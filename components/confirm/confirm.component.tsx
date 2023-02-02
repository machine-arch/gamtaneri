import styles from "./confirm.module.css";
import Button from "../button/button.component";

const Confirm = (props: any) => {
  return (
    <div className={styles.confirm_conteiner}>
      <div className={styles.confirm_question_conteiner}>
        <p className={styles.confirm_question}>
          {props?.confirmProps?.question}
        </p>
      </div>
      <div className={styles.confirm_buttons_conteiner}>
        <Button name={"accept"} hendler={props?.confirmProps?.acceptHendler} />
        <Button name={"denay"} hendler={props?.confirmProps?.cancelHendler} />
      </div>
    </div>
  );
};

export default Confirm;
