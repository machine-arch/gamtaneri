export interface HeaderProps {
  locale: string;
}

export interface FooterProps {
  dictionary: Object;
  localeKey: string;
}

export interface FormProps {
  FormProps: object;
  Loader?: boolean;
  loadrConteinerClassname?: string;
}

export interface FormPropsInterface {
  formClassName: string;
  inputs: InputInterface[];
  inputsCommonParentClass: string;
  needTextArea: boolean;
  textarea?: TextareaInterface[];
  needButton: boolean;
  buttonClass: string;
  buttonText: object;
  ButtoncallBack: Function;
}

export interface InputInterface {
  id: string;
  type: string;
  name: string;
  className: string;
  placeholder: object;
  needCommonParent: boolean;
  eventType?: string;
  callBack?: Function;
}
export interface TextareaInterface {
  textareaClass: string;
  textareaName: string;
  textareaPlaceholder: object;
}

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  ip: string;
  token: string;
}

export interface LogsInterface {
  id: number;
  apiName: string;
  errorMessage: string;
  remoteIp: string;
  localeIp: string;
}
