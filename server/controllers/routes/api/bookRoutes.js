const router = require('express').Router()
const sequelize = require('../../../config/connection')
const { User, Book } = require('../../../models')

// GET all books
router.get('/', async (req, res) => {
  try {
    const dbBookData = await Book.findAll({
      include: {
        model: User,
        attributes: ['user_name', 'email', 'password'],
      },
    })

    const books = dbBookData.map((book) => {
      return book.get({ plain: true })
    })

    res.render('books', { books })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
