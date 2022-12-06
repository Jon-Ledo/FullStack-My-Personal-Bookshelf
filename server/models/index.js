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

User.hasOne(Review, {
  foreignKey: 'user_id',
})

Review.belongsTo(User, {
  foreignKey: 'user_id',
})

module.exports = { User, Book, Review }
