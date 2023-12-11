import Joi, {AnySchema} from 'joi';
import {convertMsg, isPasswordValid} from './helpers';

const phoneValidation = Joi.string()
  .allow('')
  .trim()
  .optional()
  .min(10)
  .max(10)
  .pattern(/^(050|052|053|054|055|058)\d{7}$/)
  .messages({
    'string.pattern.base': 'Phone must start with 050/2/3/4/5/8 and only contain numbers',
    'string.min': convertMsg('Phone', '10'),
    'string.max': `Phone length cant be greater then 10 characters long`,
  });

const registerSchema: AnySchema = Joi.object({
  password: Joi.string()
    .trim()
    .allow('')
    .optional()
    .min(8)
    .max(30)
    .custom((value, helpers) => {
      const validationResult = isPasswordValid(value);
      return validationResult ? helpers.error(validationResult) : value;
    })
    .messages({
      passwordLowerUpper: 'Password must contain lowercase and uppercase letters',
      passwordFourNumbers: 'Password must contain four or more numbers',
      passwordSpecialChar: 'Password must contain one special character (!@#$%^&*?_-)',
      'string.max': `Password length cant be greater then 30 characters long`,
      'string.min': convertMsg('Password', '8'),
    }),
  firstName: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('First name', '2'),
    }),
  lastName: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Last name', '2'),
    }),
  userName: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .pattern(/^[A-Z]/)
    .messages({
      'string.min': convertMsg('Username', '2'),
      'string.pattern.base': 'Username must start with a capital letter',
    }),
  email: Joi.string()
    .trim()
    .pattern(/^\S+@\S+\.\S+$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'Invalid email address format',
    }),
  country: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Country', '2'),
    }),
  city: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('City', '2'),
    }),
  street: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Street', '2'),
    }),
  houseNumber: Joi.string().allow('').optional().pattern(/^\d+$/).messages({
    'string.pattern.base': 'House number can only contain numbers',
  }),
  zip: Joi.string().allow('').optional().pattern(/^\d+$/).messages({
    'string.pattern.base': 'Zip can only contain numbers',
  }),
  imageUrl: Joi.string().trim().uri().allow('').optional(),
  imageAlt: Joi.string().trim().allow('').optional(),
  state: Joi.string().allow('').optional(),
  business: Joi.boolean().default(false),
  admin: Joi.boolean().default(false),
  phone: phoneValidation,
}).required();

const cardSchema: AnySchema = Joi.object({
  title: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Title', '2'),
    }),
  subtitle: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Subtitle', '2'),
    }),
  description: Joi.string()
    .min(10)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Description', '10'),
    }),
  email: Joi.string()
    .trim()
    .pattern(/^\S+@\S+\.\S+$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'Invalid email address format',
    }),
  password: Joi.string()
    .trim()
    .min(8)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Password', '8'),
    }),
  country: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Country', '2'),
    }),
  city: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('City', '2'),
    }),
  street: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Street', '2'),
    }),
  houseNumber: Joi.string().allow('').optional().pattern(/^\d+$/).messages({
    'string.pattern.base': 'House number can only contain numbers',
  }),
  zip: Joi.string().allow('').optional().pattern(/^\d+$/).messages({
    'string.pattern.base': 'Zip can only contain numbers',
  }),
  web: Joi.string().trim().uri().allow('').optional(),
  imageUrl: Joi.string().trim().uri().optional().allow(''),
  imageAlt: Joi.string().trim().optional().allow(''),
  state: Joi.string().allow('').optional(),
  phone: phoneValidation,
}).required();

const contactSchema: AnySchema = Joi.object({
  fullName: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Full name', '2'),
    }),
  email: Joi.string()
    .trim()
    .pattern(/^\S+@\S+\.\S+$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'Invalid email address format',
    }),
  subject: Joi.string()
    .min(2)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Subject', '2'),
    }),
  message: Joi.string()
    .min(10)
    .allow('')
    .optional()
    .messages({
      'string.min': convertMsg('Message', '10'),
    }),
}).required();

export {registerSchema, cardSchema, contactSchema};
