import Joi, { AnySchema } from "joi";
import { convertMsg } from "./helpers";

const registerSchema: AnySchema = Joi.object({
    firstName: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('First name', '2'),
    }),
    lastName: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('Last name', '2'),
    }),
    userName: Joi.string().min(2).allow("").optional().messages({
        "string.min": convertMsg('User name', '2'),
    }),
    phone: Joi.string().allow("").trim().optional().min(10).max(10).pattern(/^(050|052|053|054|055|058)\d{7}$/)
        .messages({
            'string.pattern.base': 'Phone must start with 050/2/3/4/5/8 and only contain numbers',
            "string.min": convertMsg('Phone', '10'),
            "string.max": `Phone length cant be greater then 10 characters long`
        }),
    email: Joi.string().trim().pattern(/^\S+@\S+\.\S+$/,).allow("").optional().messages({
        "string.pattern.base": "Invalid email address format",
    }),
    password: Joi.string().trim().allow("").optional().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/).messages({
        "string.pattern.base": "Password must contain at least one lowercase and uppercase letter, four or more numbers, one special character (!@#$%^&*?), and a minimum length of 8 characters ",
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
    houseNumber: Joi.number().allow("").optional(),
    zip: Joi.string().allow("").optional().pattern(/^\d+$/).messages({
        "string.pattern.base": "Zip can only contain numbers",
    }),
    business: Joi.boolean().default(false),
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
    phone: Joi.string().allow("").trim().optional().min(10).max(10).pattern(/^(050|052|053|054|055|058)\d{7}$/)
        .messages({
            'string.pattern.base': 'Phone must start with 050/2/3/4/5/8 and only contain numbers',
            "string.min": convertMsg('Phone', '10'),
            "string.max": `Phone length cant be greater then 10 characters long`
        }),
    email: Joi.string().trim().pattern(/^\S+@\S+\.\S+$/,).allow("").optional().messages({
        "string.pattern.base": "Invalid email address format",
    }),
    password: Joi.string().trim().min(8).allow("").optional().messages({
        "string.min": convertMsg('Password', '8'),
    }),
    web: Joi.string().trim().uri().allow("").optional(),
    imageUrl: Joi.string().trim().uri().optional().allow(""),
    imageAlt: Joi.string().trim().optional().allow(""),
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
    houseNumber: Joi.number().allow("").optional(),
    zip: Joi.string().allow("").optional().pattern(/^\d+$/).messages({
        "string.pattern.base": "Zip can only contain numbers",
    }),
}).required();


export { registerSchema, cardSchema };
