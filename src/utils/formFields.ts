import { RegisterField } from "../utils/types";


export const RegisterFields: RegisterField[] = [
    {
        required: true,
        label: 'First Name',
        type: 'text'
    },
    {
        required: false,
        label: 'Middle Name',
        type: 'text'
    },
    {
        required: true,
        label: 'Last Name',
        type: 'text'
    },
    {
        required: true,
        label: 'Phone',
        type: 'number'
    },
    {
        required: true,
        label: 'Email',
        type: 'email'
    },
    {
        required: true,
        label: 'Password',
        type: 'password'
    },
    {
        required: false,
        label: 'Image url',
        type: 'url'
    },
    {
        required: false,
        label: 'Image alt',
        type: 'text'
    },
    {
        required: false,
        label: 'State',
        type: 'text'
    },
    {
        required: true,
        label: 'Country',
        type: 'text'
    },
    {
        required: true,
        label: 'City',
        type: 'text'
    },
    {
        required: true,
        label: 'Street',
        type: 'text'
    },
    {
        required: true,
        label: 'House number',
        type: 'text'
    },
    {
        required: false,
        label: 'Zip',
        type: 'text'
    },
]