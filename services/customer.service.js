const boom = require("@hapi/boom");
const sequelize = require("../libs/sequelize");
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {
  }

  async create(data) {
    try {
      const hash = await bcrypt.hash(data.user.password, 10);
      const newData = {
        ...data,
        user: {
          ...data.user,
          password: hash,
        }
      }
      const newCustomer = await sequelize.models.Customer.create(newData, {
        include: ["user"]
      });

      delete newCustomer.dataValues.user.password;
      return newCustomer;

    } catch (err) {
      throw new Error(err);
    }
  }

  async find() {
    try {
      const rta = await sequelize.models.Customer.findAll({
        include: ['user']
      });
      return rta;
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOne(id) {
    const customer = await sequelize.models.Customer.findByPk(id, {
      include: ["orders"]
    });
    if(!customer) {
      throw boom.notFound()
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id)
    const rta = await customer.update(changes)
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    const userAssociated = await sequelize.models.User.findByPk(customer.dataValues.userId);

    await customer.destroy();
    await userAssociated.destroy();

    return { id };
  }
}

module.exports = CustomerService;
