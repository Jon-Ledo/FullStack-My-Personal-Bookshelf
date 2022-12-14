const router = require('express').Router()
const { User, Book, Review } = require('../../models')

// home page
router.get('/', async (req, res) => {
  res.render('home', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
  })
})

// signup page
router.get('/sign_up', async (req, res) => {
  res.render('signup')
})

// about page
router.get('/about', async (req, res) => {
  res.render('about', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
  })
})

// browse all books
router.get('/browse', async (req, res) => {
  try {
    const dbBookData = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name', 'email', 'id'],
          through: Review,
          as: 'user_reviews',
        },
      ],
    })

    const books = dbBookData.map((book) => {
      return book.get({ plain: true })
    })

    res.render('browse', {
      books,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    })
  } catch (error) {
    res.render('error')
  }
})

// after authentication
// bookshelf page
router.get('/bookshelf/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      include: [{ model: Book }, { model: Review }],
    })

    const userBookshelf = dbUserData.get({ plain: true })

    res.render('books', {
      userBookshelf,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    })
  } catch (error) {
    res.render('error')
  }
})

// reviews page based on book id
router.get('/reviews/:id', async (req, res) => {
  try {
    const dbBookData = await Book.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['user_name'] },
        {
          model: User,
          attributes: ['user_name', 'email', 'id'],
          through: Review,
          as: 'user_reviews',
        },
      ],
    })

    const bookData = await dbBookData.get({ plain: true })

    res.render('review', {
      bookData,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    })
  } catch (error) {
    res.render('error')
  }
})

// catch all bad requests here, redirect to browse books page
// router.get('*', async (req, res) => {
//   const dbBookData = await Book.findAll({
//     include: [
//       {
//         model: User,
//         attributes: ['user_name', 'email', 'id'],
//         through: Review,
//         as: 'user_reviews',
//       },
//     ],
//   })

//   const books = dbBookData.map((book) => {
//     return book.get({ plain: true })
//   })

//   res.render('browse', { books })
// })

module.exports = router
