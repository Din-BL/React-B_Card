import { AnySchema } from "joi";
import { ReactNode } from "react";

export type Checked = 'user' | 'business' | 'admin'
export type Pages = 'About' | 'Favorite' | 'My Cards' | 'SandBox'

export interface TitleProps {
    main: string;
    sub: string
}

export interface FormProps {
    FormTitle: string,
    FormFields: FormField[],
    FormSchema: AnySchema,
    CheckField?: CheckField,
    children?: ReactNode,
    handleRegister?: any,
    handleAdd?: any
    handleEdit?: any
    handleUser?: any
    initialValue?: any
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
    checked: Checked
    setChecked: React.Dispatch<React.SetStateAction<Checked>>;
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
    _id?: string
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
    _id?: string
    isFavorite?: boolean
    [key: string]: any;
}

export interface UserStorage {
    token: string;
    business: boolean
    admin: boolean
    userName: string;
    _id: string
}

export interface B_CardProps {
    card: BusinessCard;
}

export interface LoginContextType {
    loginInfo: UseLogin
    setLoginInfo: React.Dispatch<React.SetStateAction<UseLogin>>
}

export interface TableProps {
    Users: UserCard[]
    userDeletion: (id: string) => void
}

export interface BtnGroupProps {
    resetFields?: () => void;
    isValid?: () => boolean;
}

export interface ContactProps {
    businessInfo: BusinessCard[],
    contactSchema: AnySchema,
}

export interface UseLogin {
    admin: boolean | null;
    business: boolean | null;
    logged: UserStorage | null
}

export type UserStatus = 'User' | 'Business' | 'Admin'
