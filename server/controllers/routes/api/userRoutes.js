const router = require('express').Router()
const sequelize = require('../../../config/connection')
const { User, Book } = require('../../../models')

// GET all users
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      include: [{ model: Book }],
    })

    res.status(200).json({ message: 'All users', dbUserData })
  } catch (error) {
    res.status(500).json(error)
  }
})

// GET one user
// POST a user
// DELETE a user

module.exports = router
