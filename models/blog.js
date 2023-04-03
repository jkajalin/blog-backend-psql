const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init( {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true,      
      min: { args: 1991, msg: 'Must be any year from 1991 to present, as integer value' },
      max: { args: parseInt( new Date().getFullYear() ), msg: 'Must be any year from 1991 to present, as integer value' },
      //max: parseInt( new Date().getFullYear() ),            
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

module.exports = Blog