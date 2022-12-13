if (window.location.pathname.includes('/bookshelf')) {
  // get current user's ID (temporary)
  const splitWindowPath = window.location.pathname.split('/bookshelf/') // <-- get user id value of current 'logged in' user from URL
  const userId = Number(splitWindowPath[1]) // <-- save number to this variable

  // DOM variables
  const addBookBtn = document.querySelector('#addBook')
  const bookName = document.querySelector('#bookname')
  const authorName = document.querySelector('#author')
  const deleteBtns = document.querySelectorAll('#deleteBtn')

  // Event Listeners
  addBookBtn.addEventListener('click', (e) => {
    addBook(e)
  })
  addBookBtn.addEventListener('submit', (e) => {
    addBook(e)
  })

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const bookId = btn.closest('.book').dataset.bookId
      deleteBookFromDB(e, bookId)
    })
  })

  // FUNCTIONS
  const addBook = (e) => {
    e.preventDefault()
    // build the object for POST request
    const newBook = {
      name: bookName.value,
      author: authorName.value,
      user_id: userId,
    }

    // call POST request
    postBook(newBook).then(() => {
      window.location.reload()
    })

    // reset form fields
    bookName.value = ''
    authorName.value = ''
  }

  const deleteBookFromDB = (e, bookId) => {
    e.stopPropagation() // just in case

    deleteBook(bookId).then(() => {
      window.location.reload() // <-- janky, but works
    })
  }
} // end of bookshelf/:id

// *********************************
// ******** FETCH FUNCTIONS ********
// *********************************

// GET books
const getBooks = () => {
  fetch('/api/books', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// ADD BOOK USING FORM DETAILS
const postBook = (newBook) =>
  fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  })

// DELETE BOOK
const deleteBook = (id) =>
  fetch(`/api/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
