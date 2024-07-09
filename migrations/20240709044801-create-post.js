'use strict';
const { DataTypes } = require("sequelize");


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Datatypes) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Datatypes.INTEGER
      },
      uuid:{
        type:Datatypes.UUID,
        defaultValue:Datatypes.UUIDV4
      }, 
      body: {
        type: Datatypes.STRING,
        allowNull:false
      },
      userId:{
        type:Datatypes.INTEGER,
        allowNull:false
      },
      createdAt: {
        type: Datatypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Datatypes.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Datatypes) {
    await queryInterface.dropTable('posts');
  }
};