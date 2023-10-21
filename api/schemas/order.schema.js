const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id,
});

const createOrderSchema = Joi.object({
  customerId: id,
});

const addItemSchema = Joi.object({
  orderId: id.required(),
  productId: id.required(),
  amount: amount.required(),
});

module.exports = { createOrderSchema, getOrderSchema, addItemSchema };
