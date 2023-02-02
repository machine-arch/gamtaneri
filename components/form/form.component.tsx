import { FC, useEffect, useState, useMemo } from "react";
import { FormProps } from "../../config/interfaces/app.interfaces";
import { Oval } from "react-loader-spinner";
import dynamic from "next/dynamic";
import styles from "./form.module.css";

const Form: FC<FormProps> = (props: any) => {
  const [radioGeoChecked, setRadioGeoChecked] = useState<boolean>(true);
  const [radioEngChecked, setRadioEngChecked] = useState<boolean>(false);

  useEffect(() => {
    changeEditorLocale();
  }, [props?.FormProps?.needEditors, props?.FormProps?.editorLocale]);

  const withCommonParent: Array<any> = props?.FormProps?.inputs.filter(
    (i: any) => i.needCommonParent
  );
  const withoutCommonParent: Array<any> = props?.FormProps?.inputs.filter(
    (i: any) => !i.needCommonParent
  );

  const CkaEditor: any = dynamic<{}>(
    () => import("../editor/Editor.component").then((mod) => mod.default),
    {
      ssr: false,
    }
  );

  const changeEditorLocale = () => {
    if (props?.FormProps?.needEditors) {
      const radios = document.querySelectorAll(
        'input[type="radio"]'
      ) as NodeListOf<HTMLInputElement>;

      radios.forEach((radio) => {
        radio.addEventListener("click", (e: any) => {
          if (e.currentTarget.getAttribute("name") === "geo") {
            props?.FormProps?.setEditorLocale("ka");
            setRadioGeoChecked(true);
            setRadioEngChecked(false);
          } else if (e.currentTarget.getAttribute("name") === "eng") {
            props?.FormProps?.setEditorLocale("en");
            setRadioGeoChecked(false);
            setRadioEngChecked(true);
          }
        });
      });
    }
  };

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
      {props?.FormProps?.needEditors
        ? props.FormProps.editors.map((editor: any) => {
            return editor?.locale === props?.FormProps?.editorLocale ? (
              <div className={props?.FormProps?.editorConteiner}>
                <div className={props?.FormProps?.editorSwitchersConteiner}>
                  <div className="radio_conteiner">
                    <input
                      type="radio"
                      name="geo"
                      className="switchForm"
                      checked={radioGeoChecked}
                    />
                    <label>ka</label>
                  </div>
                  <div className="radio_conteiner">
                    <input
                      type="radio"
                      name="eng"
                      className="switchForm"
                      checked={radioEngChecked}
                    />
                    <label>en</label>
                  </div>
                </div>
                <CkaEditor
                  key={editor.id}
                  editorName={editor.editorName}
                  editorLocale={editor.locale}
                  editorPlaceholder={editor.editorPlaceholder}
                />
              </div>
            ) : null;
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
