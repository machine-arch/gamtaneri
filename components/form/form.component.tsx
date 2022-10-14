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
            const attrs = {
              type: input.type,
              name: input.name,
              id: input.name,
              placeholder: input.placeholder,
              className: input.className,
              [input.eventType]: input.callBack,
            };
            return <input key={input.id} {...attrs} />;
          })}
        </div>
      ) : null}
      {withoutCommonParent.length
        ? withoutCommonParent.map((input: any) => {
            const attrs = {
              type: input.type,
              name: input.name,
              id: input.name,
              placeholder: input.placeholder,
              className: input.className,
              [input.eventType]: input.callBack,
            };
            return <input key={input.id} {...attrs} />;
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
        <button
          className={props.FormProps.buttonClass}
          onClick={props.FormProps.ButtoncallBack}
        >
          {props.FormProps.buttonText}
        </button>
      ) : null}
    </form>
  );
};

export default Form;
