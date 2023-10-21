const boom = require("@hapi/boom");
const sequelize = require("../libs/sequelize");

class CustomerService {
  constructor() {
  }

  async create(data) {
    try {
      const newCustomer = await sequelize.models.Customer.create(data, {
        include: ["user"]
      });
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
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
