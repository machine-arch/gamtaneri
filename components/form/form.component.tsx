import { FC, useEffect, useState } from "react";
import { FormProps } from "../../config/interfaces/app.interfaces";
import { Oval } from "react-loader-spinner";
import styles from "./form.module.css";

const Form: FC<FormProps> = (props: any) => {
  console.log(props);
  const withCommonParent: Array<any> = props?.FormProps?.inputs.filter(
    (i: any) => i.needCommonParent
  );
  const withoutCommonParent: Array<any> = props?.FormProps?.inputs.filter(
    (i: any) => !i.needCommonParent
  );

  return (
    <form
      className={props?.FormProps?.formClassName}
      onSubmit={props?.FormProps?.submit}
      ref={props?.FormProps?.ref}
      name={props?.FormProps?.name}
    >
      {props?.FormProps?.needTitle ? (
        <h1 className={props?.FormProps?.titleClassname}>
          {props?.FormProps?.title}
        </h1>
      ) : null}
      {withCommonParent?.length ? (
        <div className={props?.FormProps?.inputsCommonParentClass}>
          {withCommonParent?.map((input: any) => {
            const attrs = {
              type: input.type,
              name: input.name,
              id: input.name,
              placeholder: input.placeholder,
              className: input.className,
              defaultValue: input.value,
              [input.eventType]: input.callBack,
            };
            return <input key={input.id} {...attrs} />;
          })}
        </div>
      ) : null}
      {withoutCommonParent?.length
        ? withoutCommonParent.map((input: any) => {
            const attrs = {
              type: input.type,
              name: input.name,
              id: input.name,
              placeholder: input.placeholder,
              className: input.className,
              defaultValue: input.value,
              [input.eventType]: input.callBack,
            };
            return <input key={input.id} {...attrs} />;
          })
        : null}
      {props?.FormProps?.needTextareas
        ? props.FormProps.textareas.map((textarea: any) => {
            return (
              <textarea
                key={textarea?.id}
                className={textarea?.textareaClass}
                name={textarea?.textareaName}
                placeholder={textarea?.textareaPlaceholder}
                defaultValue={textarea?.value}
              ></textarea>
            );
          })
        : null}
      {props?.FormProps?.needFileUploader ? (
        <input
          key={Math.random().toString()}
          type="file"
          className={props?.FormProps?.fileUploaderClass}
          multiple={props?.FormProps?.multiple}
          name={props?.FormProps?.fileUploaderName}
        ></input>
      ) : null}
      {props?.FormProps?.needButton ? (
        <button
          type="submit"
          className={props?.FormProps?.buttonClass}
          onClick={props?.FormProps?.ButtoncallBack}
        >
          {props?.FormProps?.buttonText}
        </button>
      ) : null}
      <div className={props?.loadrConteinerClassname}>
        <Oval
          height={30}
          width={30}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={props.Loader ? props.Loader : false}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
      <div className={styles.validate_message_conteiner}>
        <input
          type="text"
          name="validate_message"
          readOnly
          className={styles.form_validate_message}
        />
      </div>
    </form>
  );
};

export default Form;
