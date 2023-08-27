const Joi = require("joi");

module.exports.registerSchema = Joi.object({
  firstName: Joi.string().required().min(2),
  lastName: Joi.string().required().min(2),
  userName: Joi.string().required().min(2),
  phone: Joi.string().trim().required().min(10).max(10).pattern(/^(050|052|053|054|055)\d{7}$/),
  email: Joi.string().trim().required().email(),
  password: Joi.string().trim().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/),
  imageUrl: Joi.string().trim().optional().allow(""),
  imageAlt: Joi.string().trim().optional().allow("").max(128),
  state: Joi.string().optional().allow("").max(128),
  country: Joi.string().required().min(2).max(128),
  city: Joi.string().required().min(2).max(128),
  street: Joi.string().required().min(2).max(128),
  houseNumber: Joi.string().required().pattern(/^\d+$/),
  zip: Joi.string().optional().allow("").pattern(/^\d+$/),
  business: Joi.boolean().default(false),
  admin: Joi.boolean().default(false)
});

module.exports.loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/),
});

module.exports.businessSchema = Joi.object({
  title: Joi.string().required().min(2),
  subtitle: Joi.string().required().min(2),
  description: Joi.string().required().min(2),
  phone: Joi.string().trim().required().min(10).max(10).pattern(/^(050|052|053|054|055)\d{7}$/,),
  email: Joi.string().trim().email().required(),
  web: Joi.string().trim().uri().allow("").optional(),
  imageUrl: Joi.string().trim().uri().allow("").optional(),
  imageAlt: Joi.string().trim().allow("").optional(),
  state: Joi.string().allow("").optional(),
  country: Joi.string().min(2).required(),
  city: Joi.string().min(2).required(),
  street: Joi.string().min(2).required(),
  houseNumber: Joi.string().required().pattern(/^\d+$/),
  zip: Joi.string().allow("").optional().pattern(/^\d+$/)
}).required();

module.exports.emailSchema = Joi.object({
  email: Joi.string().trim().required().email().message('Invalid email address format')
}).required();;
