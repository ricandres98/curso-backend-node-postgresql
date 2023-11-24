// const boom = require('@hapi/boom');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const bcrypt = require('bcrypt');


class UsersService {
  constructor() {
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await sequelize.models.User.create({
      ...data,
      password: hash
    });

    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    try {
      const rta = await sequelize.models.User.findAll({
        include: ['customer']
      });
      return rta;
    } catch (err) {
      console.error(err)
    }
  }

  async findByEmail(email) {
    // try {
      const rta = await sequelize.models.User.findOne({
        where: { email: email }
      });
      return rta;
    // } catch (err) {
    //   console.error(err)
    // }
  }

  async findOne(id) {
    const user = await sequelize.models.User.findByPk(id);
    if(!user) {
      throw boom.notFound()
    }
    delete user.dataValues.password;

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    const rta = await user.update(changes)
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
