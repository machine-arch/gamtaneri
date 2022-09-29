const Form = (props: any) => {
  const withCommonParent: Array<any> = props.formProps.inputs.filter(
    (i: any) => i.needCommonParent
  );
  const withoutCommonParent: Array<any> = props.formProps.inputs.filter(
    (i: any) => !i.needCommonParent
  );
  return (
    <form action="#" className={props.formProps.formClassName}>
      {withCommonParent.length ? (
        <div className={props.formProps.inputsCommonParentClass}>
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
      {props.formProps.needTextArea ? (
        <textarea
          className={props.formProps.textareaClass}
          name={props.formProps.textareaName}
          placeholder={props.formProps.textareaPlaceholder}
        ></textarea>
      ) : null}
      {props.formProps.needButton ? (
        <button className={props.formProps.buttonClass}>
          {props.formProps.buttonText}
        </button>
      ) : null}
    </form>
  );
};

export default Form;
