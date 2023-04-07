const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init({
  // somehow unnesessary id definition since token can be used as unique key, lets keep this anyway
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, 
{ 
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'session'
})

module.exports = Session