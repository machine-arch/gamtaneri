import styles from "./form.module.css";

const Form = (props: any) => {
  return (
    <form action="#">
      <input type={props.type} name={props.name} className={props.className} />
    </form>
  );
};

export default Form;
