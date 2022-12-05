const router = require('express').Router()
const sequelize = require('../../../config/connection')
const { User, Book } = require('../../../models')

// api/books
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

    res.status(200).json(books)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
