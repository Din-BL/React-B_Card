
export interface TitleProps {
    main: string;
    sub: string
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

export type CheckField = {
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

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
    houseNumber: number;
    zip?: number;
    _id?: string
}
