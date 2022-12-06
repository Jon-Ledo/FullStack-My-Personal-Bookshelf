const router = require('express').Router()
const sequelize = require('../../../config/connection')
const { User, Book } = require('../../../models')

// api/users endpoint
// GET all users
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      include: [{ model: Book }],
    })

    const userData = dbUserData.map((data) => {
      return data.get({ plain: true })
    })

    res.status(200).json({ message: 'All users', userData })
  } catch (error) {
    res.status(500).json(error)
  }
})

// GET one user by id
router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      include: [{ model: Book }],
    })

    const userData = await dbUserData.get({ plain: true })

    res.status(200).json({ userData })
  } catch (error) {
    res.status(500).json(error)
  }
})

// POST a user
router.post('/', async (req, res) => {
  // body should look like this
  // {
  //  "user_name": "Read3r1234",
  //  "email": "read3r1234@gmail.com",
  //  "password": "lasagna123"
  // }
  try {
    const newUser = await User.create(req.body)

    res.status(201).json({ message: 'new user created', newUser })
  } catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE a user by id
router.put('/:id', async (req, res) => {
  // parameters to update
  // {
  //  "email": "",
  //  "password": ""
  // }
  try {
    const updateUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json({ message: 'user updated', updateUser })
  } catch (error) {
    res.status(500).json(error)
  }
})

// DELETE a user by id
router.delete('/:id', async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!deleteUser) {
      res.status(404).json({ message: 'No user can be found with that id' })
    }

    res.status(200).json({ message: 'user deleted', deleteUser })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
