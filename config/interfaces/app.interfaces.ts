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
}

export interface FormProps {
  FormProps: object;
  Loader?: boolean;
  loadrConteinerClassname?: string;
}

export interface FormPropsInterface {
  name?: string;
  needClose?: boolean;
  ref?: RefObject<HTMLElement>;
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
  ButtoncallBack: EventHandler<SyntheticEvent>;
  submit?: any;
  textareas?: object[];
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
  hendler?: MouseEventHandler<HTMLButtonElement>;
}

export interface modal {
  modal_title?: string;
  FormProps?: FormPropsInterface;
  key?: string;
  isOpen: boolean;
}

export interface modalProps {
  modalprops: modal;
}

export interface headerProps {
  setismodalopen: Function;
  setModalKey: Function;
}
