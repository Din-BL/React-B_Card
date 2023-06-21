const Joi = require("joi");

module.exports.registerSchema = Joi.object({
  firstName: Joi.string().required().min(2),
  middleName: Joi.string().optional().allow(""),
  lastName: Joi.string().required().min(2),
  phone: Joi.string().trim().required().min(10).pattern(/^(050|052|053|054|055)\d{7}$/),
  email: Joi.string().trim().required().email(),
  password: Joi.string().trim().required().min(8).max(128),
  imageUrl: Joi.string().trim().optional().allow("").max(128),
  imageAlt: Joi.string().trim().optional().allow("").max(128),
  state: Joi.string().optional().allow("").max(128),
  country: Joi.string().required().min(2).max(128),
  city: Joi.string().required().min(2).max(128),
  street: Joi.string().required().min(2).max(128),
  houseNumber: Joi.number().required().max(128),
  zip: Joi.number().optional().allow("").max(128),
  biz: Joi.boolean().default(false),
});

module.exports.loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().min(8).max(128).required(),
});

module.exports.businessSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().trim().max(200).required(),
  address: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  image: Joi.string().trim().uri().required(),
});
