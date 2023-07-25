import { AnySchema } from "joi";
import { ReactNode } from "react";

export type Pages = 'about' | 'favorite' | 'my-cards' | 'sandbox'
export type UserStatus = 'User' | 'Business' | 'Admin'
export type FormData = BusinessCard | UserCard
export type SignatureFormData = FormData & { [key: string]: any };

export interface SelectProps {
    userStatus: UserStatus,
    userId: string
    username: string
}

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
    handleRegister?: (data: any, business: boolean, admin: boolean) => void,
    handleForm?: (data: any) => void,
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
    _id?: string
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

export interface BusinessStatus {
    business: boolean
}

export interface BtnGroupProps {
    resetFields?: () => void;
    isValid?: () => boolean;
}

export interface ContactProps {
    businessInfo: BusinessCard,
    contactSchema: AnySchema,
}

export interface UseLogin {
    admin: boolean | null;
    business: boolean | null;
    logged: UserStorage | null
}



