const Joi = require('joi');
const { createUserSchema } = require('./user.schema');

const firstName = Joi.string().min(2).max(10);
const lastName = Joi.string().min(2).max(10);
const phone = Joi.string().min(7).max(12);
const id = Joi.number().integer();

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema.required()
});

const updateCustomerSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  phone: phone,
  userId: id,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
