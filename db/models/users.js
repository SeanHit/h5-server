'use strict';
const {
  Model
} = require('sequelize');
const md5 = require('md5');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    customFunc() {
      // 自定义方法
    }
  };
  User.init({
    name: { type: DataTypes.STRING, unique: true, primaryKey: true },
    password: {
      type: DataTypes.STRING, set(value) {
        this.setDataValue('password', md5(value));
      }
    },
    end_time: {
      type: DataTypes.DATE, get() {
        return new Date(this.getDataValue('end_time')).getTime();
      }
    },
    start_time: {
      type: DataTypes.DATE, defaultValue: DataTypes.NOW, get() {
        return new Date(this.getDataValue('start_time')).getTime();
      }
    },
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
    modelName: 'User',
    tableName: 'Users',
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  return User;
};