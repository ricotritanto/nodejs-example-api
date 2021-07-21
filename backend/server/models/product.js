/* eslint-disable linebreak-style */
const {Model} = require('sequelize')

module.exports=(sequelize, DataTypes) => {
  

	class product extends Model {

		/**

     * Helper method for defining associations.

     * This method is not a part of Sequelize lifecycle.

     * The `models/index` file will call this method automatically.

     */

		static associate(models) {

			// define association here

			product.belongsTo(models.satuan, {

				onDelete: 'CASCADE',

				foreignKey: 'satuan_id',

			}),

			product.belongsTo(models.category, {

				onDelete: 'CASCADE',

				foreignKey: 'category_id',

			})

		}

	}

	product.init({

		barcode: DataTypes.STRING,

		serial: DataTypes.STRING,

		product_name: DataTypes.STRING,

		slug: DataTypes.STRING,

		category_id: DataTypes.INTEGER,

		satuan_id: DataTypes.INTEGER,

		harga_beli: DataTypes.BOOLEAN,

		harga_jual: DataTypes.BOOLEAN,

		stok: DataTypes.INTEGER,

		type: DataTypes.STRING,

		image_name: DataTypes.STRING,

		data_image: DataTypes.BLOB,

		description: DataTypes.STRING,

		status: DataTypes.INTEGER

	}, {

		sequelize,

		modelName: 'product',

	})

	return product

}