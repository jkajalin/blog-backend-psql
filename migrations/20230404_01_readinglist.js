const { DataTypes, QueryInterface } = require('sequelize')

module.exports = {
  up: async ( {context: QueryInterface} ) =>{
    await QueryInterface .createTable('readinglists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: { model: 'blogs', key: 'id' },
      },
      read: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    })
  },
  down: async ( { context: QueryInterface } ) => {
    await QueryInterface.dropTable('readinglists')
  }
}