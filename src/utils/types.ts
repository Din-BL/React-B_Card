export interface TitleProps {
    main: string;
    sub: string
}

export interface RegisterField {
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