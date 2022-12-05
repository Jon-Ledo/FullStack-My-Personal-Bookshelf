const router = require('express').Router()
const { User, Book } = require('../../models')

// home page (when not logged in)
router.get('/', async (req, res) => {
  res.render('home')
})

// login page
router.get('/login', async (req, res) => {
  res.render('login')
})

// after authentication
// bookshelf page
router.get('/bookshelf/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      include: {
        model: Book,
      },
    })

    const userBookshelf = dbUserData.get({ plain: true })

    console.log(userBookshelf)

    res.render('books', { userBookshelf })
  } catch (error) {
    // error page
    res.render('error')
  }
})

module.exports = router
