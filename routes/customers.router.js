const express = require("express");
const validatorHandler = require("../middlewares/validator.handler");
const { getCustomerSchema, createCustomerSchema, updateCustomerSchema } = require("../schemas/customer.schema");
const CustomerService = require('../services/customer.service');

const router = express.Router();

const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const rta = await service.find();
    res.json(rta)
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const rta = await service.findOne(parseInt(id));

      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;

      const rta = await service.create(body);

      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const rta = await service.update(id, body);

    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;

    const rta = await service.delete(parseInt(id));

    res.json(rta)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
