const sequelize = require('../config/connection')
const User = require('../models/user')
const Book = require('../models/book')
const Review = require('../models/review')
const userSeedData = require('./user-seeds.json')
const bookSeedData = require('./book-seeds.json')
const reviewSeedData = require('./review-seeds.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true })

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  })

  const reviews = await Review.bulkCreate(reviewSeedData, {
    individualHooks: true,
    returning: true,
  })

  // create book columns, assign a random user to each book
  for (const book of bookSeedData) {
    const newBook = await Book.create({
      ...book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  process.exit(0)
}

seedDatabase()
