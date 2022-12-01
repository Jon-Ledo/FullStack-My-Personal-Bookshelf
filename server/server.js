const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const sequelize = require('./config/connection')
const { User, Book } = require('./models')
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static())

// basic tests on POSTMAN delete later
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' })
  console.log('Connected')
})
// route test
app.get('/users', async (req, res) => {
  const userData = await User.findAll()

  res.status(200).json({ message: 'All users', userData })
})
// route test
app.get('/books', async (req, res) => {
  const bookData = await Book.findAll()

  res.status(200).json({ message: 'All books', bookData })
})

// turn on routes
// app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}...`))
})
