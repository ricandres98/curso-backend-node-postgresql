const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const { Op } = require('sequelize');


class ProductsService {
  constructor() {}

  // generate() {
  //   const limit = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.imageUrl(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }

  async create(data) {
    try {
      const newProduct = await sequelize.models.Product.create(data);
      return newProduct;
    } catch(error) {
      throw new boom.badRequest(error);
    }
  }

  async find(query) {
    const { limit, offset, price, price_min, price_max } = query;

    const options = {
      include: ['category'],
      limit: limit || undefined,
      offset: offset || 0,
      where: price
        ? {
            price: {
              [Op.eq]: price,
            },
          }
        : price_min &&
          price_max && {
            price: {
              [Op.between]: [price_min, price_max],
            },
          },
    };
    const products = await sequelize.models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await sequelize.models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
