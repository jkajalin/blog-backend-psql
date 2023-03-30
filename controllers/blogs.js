const router = require('express').Router()
const { Op } = require('sequelize')

const { tokenExtractor } = require('../middlewares/tokenExtractor')

const { Blog } = require('../models')
const { User } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search
          }
        },
        {
          author: {
            [Op.substring]: req.query.search
          }
        }
      ]
    }
  }
  

  const blogs = await Blog.findAll({
    order: [ ['likes', 'DESC'] ],
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  // Tulostetaan blogit näkyville consoliin
  console.log(JSON.stringify(blogs, null, 2))

  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {

  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create( { ...req.body, userId: user.id })   

  //const blog = await Blog.create(req.body)
  return res.json(blog)

})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {

  const user = await User.findByPk(req.decodedToken.id)
    
  if (user && req.blog && req.blog.userId === user.id) {
    await req.blog.destroy();
    
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

// updating likes to value sent from app
router.put('/:id', blogFinder, async (req, res) => {
  if(req.blog){
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  }else {
    res.status(404).end()
  }
})

module.exports = router