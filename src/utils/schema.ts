import Joi, { AnySchema } from "joi";
import { convertMsg } from "./helpers";

const registerSchema: AnySchema = Joi.object({
    firstName: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('First name', '2'),
    }),
    middleName: Joi.string().allow("").allow("").optional(),
    lastName: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('Last name', '2'),
    }),
    phone: Joi.string().allow("").trim().optional().min(10).max(10).pattern(/^(050|052|053|054|055|058)/)
        .messages({
            'string.pattern.base': 'Phone number must start with 050, 052, 053, 054, 055, or 058',
            "string.min": convertMsg('Phone', '10'),
            "string.max": `Phone length must be less then or equal to 10 characters long`
        }),
    email: Joi.string().trim().pattern(/^\S+@\S+\.\S+$/,).allow("").optional().messages({
        "string.pattern.base": "Invalid email address format",
    }),
    password: Joi.string().trim().min(8).allow("").optional().messages({
        "string.min": convertMsg('Password', '8'),
    }),
    imageUrl: Joi.string().trim().uri().allow("").optional(),
    imageAlt: Joi.string().trim().allow("").optional(),
    state: Joi.string().allow("").optional(),
    country: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('Country', '2'),
    }),
    city: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('City', '2'),
    }),
    street: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('Street', '2'),
    }),
    houseNumber: Joi.number().allow("").optional().messages({
        "number.base": 'House number must be a number',
    }),
    zip: Joi.number().allow("").optional().messages({
        "number.base": 'Zip must be a number',
    }),
}).required();

const cardSchema: AnySchema = Joi.object({
    title: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('Title', '2'),
    }),
    subtitle: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('Subtitle', '2'),
    }),
    description: Joi.string().min(10).allow("").optional().messages({
        "string.min": convertMsg('Description', '10'),
    }),
    phone: Joi.string().allow("").trim().optional().min(10).pattern(/^(050|052|053|054|055)\d{7}$/,).messages({
        "string.pattern.base": "Invalid phone format",
        "string.min": convertMsg('Phone', '10'),
    }),
    email: Joi.string().trim().pattern(/^\S+@\S+\.\S+$/,).allow("").optional().messages({
        "string.pattern.base": "Invalid email address format",
    }),
    password: Joi.string().trim().min(8).allow("").optional().messages({
        "string.min": convertMsg('Password', '8'),
    }),
    web: Joi.string().trim().uri().allow("").optional(),
    imageUrl: Joi.string().trim().uri().allow("").optional(),
    imageAlt: Joi.string().trim().allow("").optional(),
    state: Joi.string().allow("").optional(),
    country: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('Country', '2'),
    }),
    city: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('City', '2'),
    }),
    street: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('Street', '2'),
    }),
    houseNumber: Joi.number().allow("").optional().messages({
        "number.base": 'House number must be a number',
    }),
    zip: Joi.number().allow("").optional().messages({
        "number.base": 'Zip must be a number',
    }),
}).required();


export { registerSchema, cardSchema };
