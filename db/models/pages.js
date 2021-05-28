'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Page.init({
    tid: { type: DataTypes.STRING, unique: true },
    pageConfig: {
      type: DataTypes.STRING, get() {
        return JSON.parse(this.getDataValue('pageConfig'))
      }, set(value) {
        this.setDataValue('pageConfig', JSON.stringify(value));
      }
    },
    tpl: {
      type: DataTypes.STRING, get() {
        return JSON.parse(this.getDataValue('tpl'))
      }, set(value) {
        this.setDataValue('tpl', JSON.stringify(value));
      }
    },
    creator: DataTypes.STRING,
    update_time: {
      type: DataTypes.DATE, get() {
        return new Date(this.getDataValue('update_time')).getTime();
      }
    },
    create_time: {
      type: DataTypes.DATE, get() {
        return new Date(this.getDataValue('create_time')).getTime();
      }
    }
  }, {
    sequelize,
    modelName: 'Page',
    tableName: 'Pages',
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  return Page;
};