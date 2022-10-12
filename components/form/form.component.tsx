import { FC } from "react";
import { FormProps } from "../../config/interfaces/app.interfaces";

const Form: FC<FormProps> = (props: any) => {
  const withCommonParent: Array<any> = props.FormProps.inputs.filter(
    (i: any) => i.needCommonParent
  );
  const withoutCommonParent: Array<any> = props.FormProps.inputs.filter(
    (i: any) => !i.needCommonParent
  );
  return (
    <form action="#" className={props.FormProps.formClassName}>
      {withCommonParent.length ? (
        <div className={props.FormProps.inputsCommonParentClass}>
          {withCommonParent.map((input: any) => {
            return (
              <input
                key={input.id}
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                className={input.className}
              />
            );
          })}
        </div>
      ) : null}
      {withoutCommonParent.length
        ? withoutCommonParent.map((input: any) => {
            return (
              <input
                key={input.id}
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                className={input.className}
              />
            );
          })
        : null}
      {props.FormProps.needTextArea ? (
        <textarea
          className={props.FormProps.textareaClass}
          name={props.FormProps.textareaName}
          placeholder={props.FormProps.textareaPlaceholder}
        ></textarea>
      ) : null}
      {props.FormProps.needButton ? (
        <button className={props.FormProps.buttonClass}>
          {props.FormProps.buttonText}
        </button>
      ) : null}
    </form>
  );
};

export default Form;
