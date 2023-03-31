const router = require('express').Router()
const { Sequelize } = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res) => { 

  const blogs = await Blog.findAll({ 
    group: 'author',
    attributes: [
      'author',
      [Sequelize.fn('COUNT', Sequelize.col('author')), 'blogs'],
      [Sequelize.fn('sum', Sequelize.col('likes')), 'likes']      
    ],
    order: [ ['likes', 'DESC'] ]    
  })
  // Tulostetaan blogit näkyville consoliin
  console.log(JSON.stringify(blogs, null, 2))

  res.json(blogs)
})

module.exports = router