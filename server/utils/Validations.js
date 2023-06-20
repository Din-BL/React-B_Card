const Joi = require("joi");

module.exports.registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().min(8).max(128).required(),
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
