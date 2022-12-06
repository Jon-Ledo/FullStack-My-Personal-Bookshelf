const router = require('express').Router()
const sequelize = require('../../../config/connection')
const { User, Book, Review } = require('../../../models')

// api/books endpoint
// GET all books
router.get('/', async (req, res) => {
  try {
    const dbBookData = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name', 'email'],
        },
        { model: Review },
      ],
    })

    const books = dbBookData.map((book) => {
      return book.get({ plain: true })
    })

    res.status(200).json(books)
  } catch (error) {
    res.status(500).json(error)
  }
})

// GET book by id
router.get('/:id', async (req, res) => {
  try {
    const dbBookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_name', 'email'],
        },
        { model: Review },
      ],
    })

    const bookData = await dbBookData.get({ plain: true })

    res.status(200).json({ bookData })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// POST a book
router.post('/', async (req, res) => {
  // Body should look like
  // {
  // "name": "",
  // "author": "",
  // "user_id": "" [REQUIRED --> should be based on who is logged in]
  // "image_url": "", [OPTIONAL],
  // "is_read": "BOOLEAN" [OPTIONAL]
  // }
  try {
    const newBook = await Book.create(req.body)

    res.status(201).json({ message: 'new user created', newUser })
  } catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE a book by id
router.put('/:id', async (req, res) => {
  try {
    const updateBook = await Book.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json({ message: 'book data updated' })
  } catch (error) {
    res.status(500).json(error)
  }
})

// DELETE a book by id
router.delete('/:id', async (req, res) => {
  try {
    const deleteBook = await Book.destroy({
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json({ message: 'book data deleted', deleteBook })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
