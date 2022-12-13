if (window.location.pathname.includes('/bookshelf')) {
  // change document title
  const docTitle = document.querySelector('#docTitle')
  document.title = `${docTitle.textContent}'s Bookshelf`

  // get current user's ID (temporary)
  const splitWindowPath = window.location.pathname.split('/bookshelf/') // <-- get user id value of current 'logged in' user from URL
  const userId = Number(splitWindowPath[1]) // <-- save number to this variable

  // DOM variables
  const addBookBtn = document.querySelector('#addBook')
  const bookName = document.querySelector('#bookname')
  const authorName = document.querySelector('#author')
  const deleteBtns = document.querySelectorAll('#deleteBtn')
  const readBtns = document.querySelectorAll('#readBtn')

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

  readBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const bookId = btn.closest('.book').dataset.bookId
      console.log(bookId)
      let isReadString = btn.dataset.isRead
      let isReadBoolean = isReadString === 'true' // return boolean type

      const updatedValue = {
        is_read: !isReadBoolean,
      }

      editBoolean(bookId, updatedValue).then(() => {
        if (isReadBoolean) {
          isReadString = 'true'
        } else {
          isReadString = 'false'
        }
      })
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
}

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

// UPDATE isRead Boolean
const editBoolean = (id, bool) =>
  fetch(`/api/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bool),
  })
