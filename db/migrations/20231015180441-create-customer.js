'use strict';

const { USER_TABLE } = require('../models/user.model');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { DataTypes, Sequelize } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "first_name"
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "last_name"
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING
      },
      userId: {
        field: 'user_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at'
      },
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);

  }
};
