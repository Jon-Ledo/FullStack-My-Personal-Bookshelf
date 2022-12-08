const User = require('./user')
const Book = require('./book')
const Review = require('./review')

User.hasMany(Book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})
Book.belongsTo(User, {
  foreignKey: 'user_id',
})

User.hasMany(Review, {
  foreignKey: 'user_id',
})

Review.belongsTo(User, {
  foreignKey: 'user_id',
})

Book.hasMany(Review, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE',
})

Review.belongsTo(Book, {
  foreignKey: 'book_id',
})

module.exports = { User, Book, Review }
