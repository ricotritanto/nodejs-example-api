'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      barcode: {
        type: Sequelize.STRING
      },
      serial: {
        type: Sequelize.STRING
      },
      product_name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "category",
          key: "id",
          as: "category_id",
        },
      },
      satuan_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "satuan",
          key: "id",
          as: "satuan_id",
        },
      },
      harga_beli: {
        type: Sequelize.BOOLEAN
      },
      harga_jual: {
        type: Sequelize.BOOLEAN
      },
      stok: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      image_name: {
        type: Sequelize.STRING
      },      
      data_image: {
        type: Sequelize.BLOB("long")
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};