import Joi from "joi";
import { convertMsg } from "./helpers";

const registerSchema = Joi.object({
    firstName: Joi.string().trim().min(2).allow("").optional().messages({
        "string.min": convertMsg('First name', '2'),
    }),
    middleName: Joi.string().trim().allow("").allow("").optional(),
    lastName: Joi.string().min(2).trim().allow("").optional().messages({
        "string.min": convertMsg('Last name', '2'),
    }),
    phone: Joi.string().allow("").trim().optional(),
    email: Joi.string().trim().pattern(/^\S+@\S+\.\S+$/,).allow("").optional().messages({
        "string.pattern.base": "Invalid email address format",
    }),
    password: Joi.string().trim().min(8).allow("").optional().messages({
        "string.min": convertMsg('Password', '8'),
    }),
    imageUrl: Joi.string().trim().uri().allow("").optional(),
    imageAlt: Joi.string().trim().allow("").optional(),
    state: Joi.string().trim().allow("").optional(),
    country: Joi.string().trim().allow("").optional(),
    city: Joi.string().trim().allow("").optional(),
    street: Joi.string().trim().allow("").optional(),
    houseNumber: Joi.string().trim().allow("").optional(),
    zip: Joi.string().trim().allow("").optional(),
}).required();


export default registerSchema;
