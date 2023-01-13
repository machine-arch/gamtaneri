import React, {
  EventHandler,
  MouseEventHandler,
  RefObject,
  SyntheticEvent,
} from "react";

export interface HeaderProps {
  locale: string;
}

export interface FooterProps {
  dictionary: Object;
  localeKey: string;
  contacts: Object;
  sendMail: Function;
  formLoader: any;
}

export interface FormProps {
  FormProps: object;
  Loader?: boolean;
  loadrConteinerClassname?: string;
}

export interface FormPropsInterface {
  name?: string;
  needClose?: boolean;
  ref?: RefObject<HTMLFormElement>;
  close?: MouseEventHandler;
  needTitle?: boolean;
  title?: object;
  formClassName: string;
  inputs: InputInterface[];
  inputsCommonParentClass: string;
  needTextareas?: boolean;
  needButton: boolean;
  buttonClass: string;
  buttonText: string;
  needCheckbox?: boolean;
  checkbox?: any;
  needFileUploader?: boolean;
  fileUploader?: any;
  loader?: boolean;
  ButtoncallBack: EventHandler<SyntheticEvent>;
  submit?: any;
  textareas?: object[];
  data?: any;
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
  token: string | string[];
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
  datatype?: string;
  hendler?: MouseEventHandler<HTMLButtonElement>;
}

export interface modal {
  modal_title?: string;
  FormProps?: FormPropsInterface;
  confirmProps?: any;
  key?: string;
  isOpen: boolean;
  currentproject?: any;
  needHeader?: boolean;
  headerClassname?: string;
  headerLogoClassname?: string;
  headerCloseImageSrc?: string;
  colosHendler?: any;
  needHeaderTitle?: boolean;
  modal_item_conteiner_class?: string;
}

export interface modalProps {
  modalprops: modal;
  setModalTitle?: any;
}

export interface headerProps {
  setismodalopen: Function;
  setModalKey: Function;
}
