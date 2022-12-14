const path = require('path')
const express = require('express')
const session = require('express-session')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001
const sequelize = require('./config/connection')
const routes = require('./controllers/routes')

// session
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
}

app.use(session(sess))

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
app.use(cors())

// turn on routes
app.use(routes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}...`))
})
