import { NextComponentType } from "next";
import styles from "./button.module.css";

const Button: NextComponentType = () => {
  return (
    <div className="button-conteiner">
      <button className={styles.main_button}>დაგვიკავშირდი</button>
    </div>
  );
};

export default Button;
