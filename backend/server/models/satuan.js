'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class satuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      satuan.hasMany(models.satuan, {
        foreignKey: "satuan_id",
        as: "product",
      })
    }
  };
  satuan.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'satuan',
  });
  return satuan;
};