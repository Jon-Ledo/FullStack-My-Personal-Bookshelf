const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const sequelize = require('./config/connection')
const { User, Book } = require('./models')
const routes = require('./controllers/routes')

// handlebars
const exphbs = require('express-handlebars')
const helpers = require('./utils/helpers')
const hbs = exphbs.create({ helpers })
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// general middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// DELETE/MOVE ROUTES to routes folder later
app.get('/bookshelf', async (req, res) => {
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
// route test
app.get('/', async (req, res) => {
  const dbBookData = await Book.findAll({
    include: {
      model: User,
      attributes: ['user_name', 'email', 'password'],
    },
  })
  res.status(200).json({ msg: 'connected', dbBookData })
})

// route test
app.get('/users', async (req, res) => {
  const userData = await User.findAll()

  res.status(200).json({ message: 'All users', userData })
})

// turn on routes
// app.use(routes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}...`))
})
