const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string();
const image = Joi.string().uri();

const limit = Joi.number().integer().min(1)
const offset = Joi.number().integer().min(0)

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: id.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  categoryId: id,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,
  price_min: price,
  price_max: price.when("price_min", {
    is: price.required(),
    then: Joi.required(),
  })
})

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
