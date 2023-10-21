'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('../models/order.model');
const { CUSTOMER_TABLE } = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "customer_id",
        references: {
          model: CUSTOMER_TABLE,
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
