import { FormField } from "./types";

export const RegisterFields: FormField[] = [
    {
        required: true,
        label: 'first name',
        state: 'firstName',
        type: 'text'
    },

    {
        required: true,
        label: 'last Name',
        state: 'lastName',
        type: 'text'
    },
    {
        required: true,
        label: 'user name',
        state: 'userName',
        type: 'text'
    },
    {
        required: true,
        label: 'phone',
        type: 'text'
    },
    {
        required: true,
        label: 'email',
        type: 'email'
    },
    {
        required: true,
        label: 'password',
        type: 'password'
    },
    {
        required: false,
        label: 'image url',
        state: 'imageUrl',
        type: 'url'
    },
    {
        required: false,
        label: 'image alt',
        state: 'imageAlt',
        type: 'text'
    },
    {
        required: false,
        label: 'state',
        type: 'text'
    },
    {
        required: true,
        label: 'country',
        type: 'text'
    },
    {
        required: true,
        label: 'city',
        type: 'text'
    },
    {
        required: true,
        label: 'street',
        type: 'text'
    },
    {
        required: true,
        label: 'house number',
        state: 'houseNumber',
        type: 'text'
    },
    {
        required: false,
        label: 'zip',
        type: 'text'
    }
]
export const CardFields: FormField[] = [
    {
        required: true,
        label: 'title',
        type: 'text'
    },
    {
        required: true,
        label: 'subtitle',
        type: 'text'
    },
    {
        required: true,
        label: 'description',
        type: 'text'
    },
    {
        required: true,
        label: 'phone',
        type: 'text'
    },
    {
        required: true,
        label: 'email',
        type: 'email'
    },
    {
        required: false,
        label: 'web',
        type: 'url'
    },
    {
        required: false,
        label: 'image url',
        state: 'imageUrl',
        type: 'url'
    },
    {
        required: false,
        label: 'image alt',
        state: 'imageAlt',
        type: 'text'
    },
    {
        required: false,
        label: 'state',
        type: 'text'
    },
    {
        required: true,
        label: 'country',
        type: 'text'
    },
    {
        required: true,
        label: 'city',
        type: 'text'
    },
    {
        required: true,
        label: 'street',
        type: 'text'
    },
    {
        required: true,
        label: 'house number',
        state: 'houseNumber',
        type: 'text'
    },
    {
        required: false,
        label: 'zip',
        type: 'text'
    }
]
export const ContactFields: FormField[] = [
    {
        required: true,
        label: 'full name',
        state: 'fullName',
        type: 'text',
        width: 6
    },
    {
        required: true,
        label: 'email',
        type: 'email',
        width: 6
    },
    {
        required: true,
        label: 'subject',
        type: 'text',
        width: 12
    },
    {
        required: true,
        label: 'message',
        type: 'text',
        multiline: true,
        width: 12
    }

]