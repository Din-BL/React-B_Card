import Joi from "joi";
import { convertMsg } from "./helpers";

const registerSchema = Joi.object({
    firstName: Joi.string().trim().min(2).allow("").optional().messages({
        "string.min": convertMsg('First name', '2'),
    }),
    middleName: Joi.string().trim().min(2).allow("").allow("").optional().messages({
        "string.min": convertMsg('Middle name', '2'),
    }),
    lastName: Joi.string().min(2).trim().allow("").optional().messages({
        "string.min": convertMsg('Last name', '2'),
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
    imageUrl: Joi.string().trim().uri().allow("").optional(),
    imageAlt: Joi.string().trim().allow("").optional(),
    state: Joi.string().min(2).trim().allow("").optional().messages({
        "string.min": convertMsg('State', '2'),
    }),
    country: Joi.string().min(2).trim().allow("").optional().messages({
        "string.min": convertMsg('Country', '2'),
    }),
    city: Joi.string().min(2).trim().allow("").optional().messages({
        "string.min": convertMsg('City', '2'),
    }),
    street: Joi.string().min(2).trim().allow("").optional().messages({
        "string.min": convertMsg('Street', '2'),
    }),
    houseNumber: Joi.number().allow("").optional().messages({
        "number.base": 'House number must be a number',
    }),
    zip: Joi.number().allow("").optional().messages({
        "number.base": 'Zip must be a number',
    }),
}).required();


export default registerSchema;
