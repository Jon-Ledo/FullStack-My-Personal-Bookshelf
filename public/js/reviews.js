if (window.location.pathname.includes('/reviews')) {
  // get current user's ID (temporary)
  const splitWindowPath = window.location.pathname.split('/reviews/') // <-- get book id value of current page being viewed from URL
  const bookId = Number(splitWindowPath[1]) // <-- save number to this variable

  const textArea = document.querySelector('textarea')
  const reviewBtn = document.querySelector('#submitReview')
  const secretSelector = document.querySelector('#secretSelector')
  const userId = Number(secretSelector.textContent) // get current users id
  const userName = document.querySelector('#userName')
  const editReviewBtn = document.querySelector('#editReview')
  const deleteReviewBtn = document.querySelector('#deleteReview')

  // event listeners
  reviewBtn.addEventListener('click', (e) => {
    addReview(e)
  })
  editReviewBtn.addEventListener('click', (e) => {
    editReview(e)
  })
  deleteReviewBtn.addEventListener('click', (e) => {
    console.log('clicked')
    console.log(deleteReviewBtn)
    deleteReviewFromDB(e, 8) // hard coded for now
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
  const editReview = (e) => {
    // check to see if review-component has current user
    e.preventDefault()
    if (userName.textContent) {
      console.log('edit working')
      // no logic yet
    }
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

const deleteReview = (id) =>
  fetch(`/api/reviews/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
