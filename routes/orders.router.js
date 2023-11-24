const express = require('express');
const OrdersService = require('./../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { /*createOrderSchema,*/ getOrderSchema, addItemSchema } = require('../schemas/order.schema');
const passport = require('passport');

const router = express.Router();

const service = new OrdersService();

router.get('/', async (req, res, next) => {
  try {
    const rta = await service.find();
    res.json(rta);
  } catch (error) {
    next(error)
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.findOne(parseInt(id));
    res.json(rta);
  } catch (error) {
    next(error)
  }
});

router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  // validatorHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const user = req.user;
      console.log(user)
      // const { body } = req;
      const rta = await service.create(user.sub);
      res.status(201).json(rta);
    } catch (error) {
      next(error)
    }
});

router.post(
  '/add-item',
  validatorHandler(addItemSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error)
    }
});



module.exports = router;
