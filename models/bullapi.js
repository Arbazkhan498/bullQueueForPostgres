'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bullApi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bullApi.init({
    api: DataTypes.STRING,
    count:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
  }, {
    sequelize,
    modelName: 'bullApis',
    tableName: 'bullApis'
  });
  return bullApi;
};