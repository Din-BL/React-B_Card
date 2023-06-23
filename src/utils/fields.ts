import { FormField } from "./types";


export const RegisterFields: FormField[] = [
    {
        required: true,
        label: 'first name',
        state: 'firstName',
        type: 'text'
    },
    {
        required: false,
        label: 'middle name',
        state: 'middleName',
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
        type: 'number'
    },
    {
        required: false,
        label: 'zip',
        type: 'text'
    },
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
        type: 'number'
    },
    {
        required: false,
        label: 'zip',
        type: 'text'
    },
]