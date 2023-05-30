import { IRecord } from "./schemas";
import { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
export interface IAnalysisItemProps {
  record: IRecord;
}

export interface IProfileUserData {
  fullname: string;
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  avatar: number;
}

export interface IAvatarSelectorProps {
  index: number;
  onSelect: React.Dispatch<React.SetStateAction<IProfileUserData>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type IButtonType =
  | "primary"
  | "transparent"
  | "disabled"
  | "success"
  | "error";

export interface IButtonProps
  extends Omit<ChakraButtonProps, "bg" | "_hover" | "_active" | "_focus"> {
  buttonType: IButtonType;
}

export interface IBottomNavItem {
  id: string;
  title: string;
  icon: JSX.Element;
  link: string;
}

export interface IFormInput {
  placeholder: string;
  id: string;
  type: string;
}

export interface IFormProps {
  title: string;
  inputs: IFormInput[];
  buttonText: string;
  state: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  onButtonClick: () => void;
  error: any;
}

export interface ILayoutProps {
  children: React.ReactNode;
}

export interface ILoaderProps {
  fullScreen: boolean;
  size?: string;
  thickness?: string;
  text?: string;
}

export interface INavButtonProps {
  navItem: IBottomNavItem;
  selectedItem: string;
  handleClick: (item: IBottomNavItem) => void;
}
