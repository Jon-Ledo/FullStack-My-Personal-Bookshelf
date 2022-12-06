const router = require('express').Router()
const sequelize = require('../../../config/connection')
const { Review, User, Book } = require('../../../models')

// api/reviews
// GET all reviews
router.get('/', async (req, res) => {
  try {
    const dbReviewData = await Review.findAll({
      include: {
        model: User,
        attributes: ['id', 'user_name'],
      },
    })

    const reviews = dbReviewData.map((review) => {
      return review.get({ plain: true })
    })

    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json(error)
  }
})

// GET one review by id
router.get('/:id', async (req, res) => {
  try {
    const dbReviewData = await Review.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'user_name'],
      },
    })

    const review = dbReviewData.get({ plain: true })

    res.status(200).json(review)
  } catch (error) {
    res.status(500).json(error)
  }
})

// CREATE a review
router.post('/', async (req, res) => {
  // body should look like this
  // {
  //   "text": "",
  //   "user_id":
  // }
  try {
    const newReview = await Review.create(req.body)

    res.status(200).json(newReview)
  } catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE one review by id
router.put('/:id', async (req, res) => {
  // body should look like this
  // {
  //   "text": ""
  // }
  try {
    const updateReview = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json({ message: 'review updated!', updateReview })
  } catch (error) {
    res.status(500).json(error)
  }
})
// DELETE one review by id
router.delete('/:id', async (req, res) => {
  try {
    const deleteReview = await Review.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!deleteReview) {
      res.status(404).json({ message: 'No user can be found with that id' })
    }

    res.status(200).json({ message: 'review deleted', deleteReview })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
