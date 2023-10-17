import { AnySchema } from "joi";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type Pages = 'home' | 'about' | 'favorite' | 'my-cards' | 'sandbox' | 'login' | 'contact'
export type UserStatus = 'User' | 'Business' | 'Admin'
export type FormData = BusinessCard | UserCard
export type SignatureFormData = FormData & { [key: string]: any };
export type View = 'grid' | 'table'

export interface FavoriteCardsParams {
    toggle: () => void
    card: BusinessCard,
    setFavorite: Dispatch<SetStateAction<BusinessCard[]>>
    admin: boolean | null
}

export interface SelectProps {
    userStatus: UserStatus,
    userId: string
    username: string
}

export interface TitleProps {
    main: string;
    sub: string
}

export interface NavActive {
    isActive: boolean
}

export interface FormProps {
    FormTitle: string,
    FormFields: FormField[],
    FormSchema: AnySchema,
    CheckField?: CheckField,
    children?: ReactNode,
    handleForm: <Type> (data: Type) => void,
    initialValue?: SignatureFormData
}

export interface FormField {
    required: boolean;
    label: string;
    state?: string
    type: string
    multiline?: boolean
    width?: number
}

export interface LoginField {
    email: string;
    password: string
}

export interface FooterLinkProps {
    to: string,
    icon: any,
    text: string
}

export type CheckField = {
    checked: UserStatus
    setChecked: React.Dispatch<React.SetStateAction<UserStatus>>;
};

export interface UserCard {
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    email: string;
    password: string;
    imageUrl?: string;
    imageAlt?: string;
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip?: string;
    business: boolean;
    admin: boolean;
    readonly _id?: string
    [key: string]: any;
}

export interface BusinessCard {
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web?: string;
    imageUrl?: string;
    imageAlt?: string;
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip?: string;
    readonly _id?: string
    __v?: number
    isFavorite?: boolean
    [key: string]: any;
}

export interface UserStorage {
    token: string;
    business: boolean
    admin: boolean
    userName: string;
    readonly _id: string
}

export interface B_CardProps {
    card: BusinessCard;
}

export interface FavoriteIconProps {
    card: BusinessCard
}

export interface LoginContextType {
    loginInfo: UseLogin
    setLoginInfo: React.Dispatch<React.SetStateAction<UseLogin>>
}

export interface ViewContextType {
    view: View
    handleView: (event: React.MouseEvent<HTMLElement>, nextView: View) => void
}

export interface RequestUser {
    [username: string]: number;
}

export interface LoadingContextType {
    loading: boolean
}

export interface TableProps {
    Users: UserCard[]
    userDeletion: (id: string) => void
}

export interface TableModeProps {
    cards: BusinessCard[]
}

export interface BusinessStatus {
    business: boolean
}

export interface BtnGroupProps {
    resetFields: () => void;
    disableBtn?: () => boolean
}

export interface ContactProps {
    businessInfo: BusinessCard,
}

export interface UseLogin {
    admin: boolean | null;
    business: boolean | null;
    logged: UserStorage | null
}

export interface CrossoverProps {
    main: string
    sub: string
}

