import { FC, useEffect, useState, useMemo } from 'react';
import { FormProps } from '../../config/interfaces/app.interfaces';
import { Oval } from 'react-loader-spinner';
import dynamic from 'next/dynamic';
import styles from './form.module.css';
import Image from 'next/image';
import { imageLoaderProp } from '../../utils/app.util';

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
    () => import('../editor/Editor.component').then((mod) => mod.default),
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
        radio.addEventListener('click', (e: any) => {
          if (e.currentTarget.getAttribute('name') === 'geo') {
            props?.FormProps?.setEditorLocale('ka');
            setRadioGeoChecked(true);
            setRadioEngChecked(false);
          } else if (e.currentTarget.getAttribute('name') === 'eng') {
            props?.FormProps?.setEditorLocale('en');
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
      {props?.FormProps?.needcCheckBoxss
        ? props?.FormProps?.checkBoxss?.map((checkbox: any) => {
            return (
              <div key={checkbox.id} className={checkbox.parentClass}>
                <input
                  type="checkbox"
                  name={checkbox.name}
                  id={checkbox.id}
                  className={checkbox.className}
                  checked={checkbox.checked}
                  onChange={checkbox.eventHandler}
                />
                <label htmlFor={checkbox.id}>{checkbox.labelName}</label>
              </div>
            );
          })
        : null}
      {withCommonParent?.length ? (
        <div
          key={Date.now().toString()}
          className={props?.FormProps?.inputsCommonParentClass}
        >
          {withCommonParent?.map((input: any) => {
            const attrs = {
              type: input.type,
              name: input.name,
              id: input.name,
              placeholder: input.placeholder,
              className: input.className,
              defaultValue: input.value,
              [input.eventType]: input.eventHandler,
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
              [input.eventType]: input.eventHandler,
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
                      onChange={() => {}}
                    />
                    <label>ka</label>
                  </div>
                  <div className="radio_conteiner">
                    <input
                      type="radio"
                      name="eng"
                      className="switchForm"
                      checked={radioEngChecked}
                      onChange={() => {}}
                    />
                    <label>en</label>
                  </div>
                </div>
                <CkaEditor
                  key={editor.id}
                  editorName={editor.editorName}
                  editorLocale={editor.locale}
                  editorPlaceholder={editor.editorPlaceholder}
                  value={editor.value ? editor.value : null}
                  valueEN={editor.valueEN ? editor.valueEN : null}
                />
              </div>
            ) : null;
          })
        : null}
      {props?.FormProps?.needFileUploader ? (
        <div>
          <input
            key={Math.random().toString()}
            type="file"
            style={{ width: '98px' }}
            className={props?.FormProps?.fileUploaderClass}
            multiple={props?.FormProps?.multiple}
            name={props?.FormProps?.fileUploaderName}
            onChange={props?.FormProps?.UploaderEventHandler}
          ></input>
          {props?.FormProps?.uploadedFiles?.length > 0 && (
            <div className={styles.form_images_conteiner}>
              {Array.from(props?.FormProps?.uploadedFiles).map(
                (file: any, i: any) => {
                  return (
                    <div key={i} className={styles.form_images}>
                      <Image
                        src={
                          typeof file === 'object'
                            ? URL.createObjectURL(file)
                            : file
                        }
                        alt="project img"
                        width={70}
                        height={70}
                        loader={imageLoaderProp}
                      />
                      <img
                        alt="close"
                        src="/images/image_delete.svg"
                        className={styles.form_image_delete}
                        onClick={(e) => {
                          e.preventDefault();
                          //remove file from array
                          props?.FormProps?.setProjectFiles(
                            props?.FormProps?.uploadedFiles.filter(
                              (f: any) => f !== file
                            )
                          );
                        }}
                      />
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
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
