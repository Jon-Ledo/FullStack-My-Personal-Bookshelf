if (window.location.pathname.includes('/reviews')) {
  // change document title
  const docTitle = document.querySelector('.docTitle')
  document.title = `Reviews for ${docTitle.textContent}`

  // get current user's ID (temporary)
  const splitWindowPath = window.location.pathname.split('/reviews/') // <-- get book id value of current page being viewed from URL
  const bookId = Number(splitWindowPath[1]) // <-- save number to this variable

  const textArea = document.querySelector('textarea')
  const reviewBtn = document.querySelector('#submitReview')
  const secretSelector = document.querySelector('#secretSelector')
  const userId = Number(secretSelector.textContent) // get current users id
  const hiddenUserName = document.querySelector('#hiddenUserName')
  const editReviewBtn = document.querySelector('#editReview')
  const deleteReviewBtn = document.querySelector('#deleteReview')
  const reviewContainers = document.querySelectorAll('.reader-review')

  // event listeners
  reviewBtn.addEventListener('click', (e) => {
    addReview(e)
  })

  editReviewBtn.addEventListener('click', (e) => {
    editUserReview(e)
  })

  deleteReviewBtn.addEventListener('click', (e) => {
    e.preventDefault()

    reviewContainers.forEach((review) => {
      const userReviewId = Number(review.dataset.reviewId)

      // DOM traversal
      const reviewer = review.parentElement.children[1].firstChild.textContent

      if (hiddenUserName.textContent === reviewer) {
        // delete user's review
        deleteReviewFromDB(e, userReviewId)
      }
    })
  })

  // add a review
  const addReview = (e) => {
    e.preventDefault()
    // build the object for POST request
    const newReview = {
      text: textArea.value,
      book_id: bookId,
      user_id: userId,
    }

    // call POST request
    postReview(newReview).then(() => {
      window.location.reload()
    })

    // reset form fields
    textArea.value = ''

    console.log('review added')
  }

  // edit a review
  const editUserReview = (e) => {
    e.preventDefault()
    // check to see if review-component has current user
    reviewContainers.forEach((review) => {
      // const userName = document.querySelector('#userName')
      // other validating options
      // const currentUserID = Number(review.dataset.userId)
      const userReviewId = Number(review.dataset.reviewId)

      // DOM traversal
      const reviewer = review.parentElement.children[1].firstChild.textContent

      if (hiddenUserName.textContent === reviewer) {
        // edit user's review
        const newReview = {
          text: textArea.value,
        }
        editReview(newReview, userReviewId).then(() => {
          window.location.reload() // <-- janky, but works
        })
      }
    })
  }

  // delete review
  const deleteReviewFromDB = (e, reviewId) => {
    e.stopPropagation()

    deleteReview(reviewId).then(() => {
      window.location.reload() // <-- janky, but works
      console.log('delete method worked')
    })
  }
}

// *********************************
// ******** FETCH FUNCTIONS ********
// *********************************
const postReview = (newReview) =>
  fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReview),
  })

const editReview = (newReview, id) =>
  fetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReview),
  })

const deleteReview = (id) =>
  fetch(`/api/reviews/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
