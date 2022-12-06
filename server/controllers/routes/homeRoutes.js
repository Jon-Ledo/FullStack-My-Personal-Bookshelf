const router = require('express').Router()
const { User, Book } = require('../../models')

// home page (when not logged in)
router.get('/', async (req, res) => {
  res.render('home')
})

// signup page
router.get('/sign_up', async (req, res) => {
  res.render('signup')
})

// login page
router.get('/login', async (req, res) => {
  res.render('login')
})

// about page
router.get('/about', async (req, res) => {
  res.render('about')
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

    res.render('books', { userBookshelf })
  } catch (error) {
    res.render('error')
  }
})

// error page, catch all bad requests here
// NOTE currently blocking API request too. Disabled for now
// router.get('*', (req, res) => {
//   res.render('error')
// })

module.exports = router
