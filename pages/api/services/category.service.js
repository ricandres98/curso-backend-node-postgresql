const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await sequelize.models.Category.create(data);

    return newCategory;
  }

  async find() {
    const categories = await sequelize.models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await sequelize.models.Category.findByPk(id, {
      include: ['products']
    });
    if(!category) {
      throw boom.badRequest('That category doesn`t exists');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes)
    return rta;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy()
    return { id };
  }

}

module.exports = CategoryService;
