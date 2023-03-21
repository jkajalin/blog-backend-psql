require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  let blogs = ''
  try {
    await sequelize.authenticate()
    blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    
    blogs.map( b => console.log( `${b.author}: ${b.title}, ${b.likes} likes`) )    
    
    //console.log(blogs)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()