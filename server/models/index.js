const User = require('./user')
const Book = require('./book')

User.hasMany(Book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})
Book.belongsTo(User, {
  foreignKey: 'user_id',
})

module.exports = { User, Book }
