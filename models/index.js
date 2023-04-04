const Blog = require("./blog")
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany( Blog )
Blog.belongsTo( User )

//Blog.sync({ alter: true })
//User.sync({ alter: true })

User.belongsToMany( Blog, { through: Readinglist, as: 'markedBlogs' } ) // users marked blogs
Blog.belongsToMany( User, { through: Readinglist, as: 'blogReaders' } ) // blogs marked by users

module.exports = { 
  Blog, User, Readinglist
}