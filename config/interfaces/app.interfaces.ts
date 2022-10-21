import { MouseEventHandler } from "react";

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
  needClose?: boolean;
  close?: MouseEventHandler;
  needTitle?: boolean;
  title?: object;
  formClassName: string;
  inputs: InputInterface[];
  inputsCommonParentClass: string;
  needTextArea: boolean;
  textarea?: TextareaInterface;
  needButton: boolean;
  buttonClass: string;
  buttonText: object;
  needCheckbox?: boolean;
  checkbox?: any;
  needFileUploader?: boolean;
  fileUploader?: any;
  ButtoncallBack: any;
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
  textareaClass: any;
  textareaName: any;
  textareaPlaceholder: any;
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

export interface buttonProps {
  name: string;
  hendler?: MouseEventHandler<HTMLButtonElement>;
}

export interface modal {
  modal_title: string;
  FormProps: FormPropsInterface;
  isOpen: boolean;
}

export interface modalProps {
  modalprops: modal;
}
