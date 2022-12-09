const router = require('express').Router()
const { User, Book, Review } = require('../../models')

// home page
router.get('/', async (req, res) => {
  res.render('home')
})

//login page
router.get('/login', async (req, res) => {
  res.render('login')
})

// signup page
router.get('/sign_up', async (req, res) => {
  res.render('signup')
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
      include: [{ model: Book }, { model: Review }],
    })

    const userBookshelf = dbUserData.get({ plain: true })

    res.render('books', { userBookshelf })
  } catch (error) {
    res.render('error')
  }
})

// reviews page based on book id
router.get('/reviews/:id', async (req, res) => {
  try {
    const dbBookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_name', 'email', 'id'],
          through: Review,
          as: 'user_reviews',
        },
      ],
    })

    const bookData = await dbBookData.get({ plain: true })

    res.render('review', { bookData })
  } catch (error) {
    res.render('error')
  }
})

// router.get('/reviews/:id', async (req, res) => {
//   try {
//     const dbReviewData = await Review.findByPk(req.params.id, {
//       include: [
//         { model: User, attributes: ['id', 'user_name'] },
//         { model: Book },
//       ],
//     })

//     const review = dbReviewData.get({ plain: true })

//     res.render('review', { review })
//   } catch (error) {
//     res.render('error')
//   }
// })

// error page, catch all bad requests here
// NOTE currently blocking API request too. Disabled for now
// router.get('*', (req, res) => {
//   res.render('error')
// })

// TEST PAGE TO RUN FUNCTIONS
// DELETE BEFORE FINAL PUSH
router.get('/test', async (req, res) => {
  res.render('test')
})
//DELETE BEFORE FINAL PUSH

module.exports = router
