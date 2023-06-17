import { IRecord, IUser } from "./schemas";
import { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { SetStateAction } from "react";
import { Session, DefaultSession } from "next-auth";
export interface IAnalysisItemProps {
  record: IRecord;
}

export interface IProfileUserData {
  fullname?: string;
  username?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  avatar?: number;
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
  fullScreen?: boolean;
  size?: string;
  thickness?: string;
  text?: string;
}

export interface INavButtonProps {
  navItem: IBottomNavItem;
  selectedItem: string;
  handleClick: (item: IBottomNavItem) => void;
}

export interface IPasswordEditorProps {
  password: string;
  setPassword: React.Dispatch<SetStateAction<string>>;
}

export interface IAutoGenerateOptions {
  length: number;
  numbers: boolean;
  symbols: boolean;
  lower: boolean;
  upper: boolean;
}

export interface ICheckResult {
  percent?: string;
  color?: string;
}

export interface ITopNavProps {
  title?: string;
  type: "basic" | "backAndDelete" | "backAndTitle" | "search";
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery?: string;
  onClear?: () => void;
}

export type ISessionUser = DefaultSession["user"] & {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
};

export interface IRecordEditData {
  password?: string;
  title?: string;
  url?: string;
  username: string;
}

export interface IRecordEditingProps {
  type: "new" | "edit";
  user: IUser;
  record: IRecordEditData;
}

export interface IRecordItemProps {
  record: IRecord;
}

export interface IRecordsSecurityProps {
  records: IRecord[];
}
export interface ISettingItemProps {
  title: string;
  type: "route" | "switch" | "text";
  text?: string;
  onClick?: () => void;
}
export interface IWebsiteIconProps {
  logo: string;
}

export interface IProfilePageProps {
  user: IUser;
  defaultData: IProfileUserData;
  records: IRecord[];
}
export const defaultRecordData: IRecordEditData = {
  title: "",
  url: "",
  username: "",
  password: "",
};
