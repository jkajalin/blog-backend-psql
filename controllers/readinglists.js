const router = require('express').Router()

const { User, Blog, Readinglist } = require('../models')

// list all values
router.get('/', async (req, res) => {
  const lists = await Readinglist.findAll({})
  res.json(lists)
})

// add blog to user readinglist
router.post('/', async (req, res) => {  
  try {
    //console.log(req.body)
    const { blog_id, user_id } = req.body
    //console.log(blog_id)

    //const toReadinglist = Readinglist.build( { blogId: blog_id, userId: user_id } ) // vastaavasti toimiva vaihtoehto
    //await toReadinglist.save()
    const toReadinglist = await Readinglist.create( { blogId: blog_id, userId: user_id } )
    //const toReadinglist = await Readinglist.create( { ...req.body } ) // ei toimi
    res.json(toReadinglist)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router