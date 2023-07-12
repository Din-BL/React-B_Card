import { AnySchema } from "joi";
import { ReactNode } from "react";
import { Login } from "../hooks/useLogin";

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
    initialValue?: BusinessCard
}

export interface FormField {
    required: boolean;
    label: string;
    state?: string
    type: string
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

export type Checked = 'user' | 'business' | 'admin'

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
    loginInfo: Login
    setLoginInfo: React.Dispatch<React.SetStateAction<Login>>
}
export type Pages = 'About' | 'Favorite' | 'My Cards' | 'SandBox'
