// -------------- test api calls  --------------------
fetch('/api/books')
  .then((response) => response.json())
  .then((data) => console.log('BOOKS DATA', data))

fetch('/api/users')
  .then((response) => response.json())
  .then((data) => console.log('USERS DATA', data))

fetch('/api/reviews')
  .then((response) => response.json())
  .then((data) => console.log('REVIEWS DATA', data))
// ---------------------------------------------------------------

const getBooks = () => {
  fetch('/api/books', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// -----------------------------------------------------------------------------------------------
// ADD BOOK USING FORM DETAILS
const addBook = (newBook) =>
  fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  })

// ---------------------------------------------------------------------------
// setup necessary because of the different pathnames. some variables don't exist on other pages, and will prevent any other JS to run correctly
let addBookBtn
let bookName
let authorName

// convert from test page to real page later
if (window.location.pathname === '/test') {
  addBookBtn = document.querySelector('#addBook')
  bookName = document.querySelector('#bookname')
  authorName = document.querySelector('#author')

  addBookBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const newBook = {
      name: bookName.value,
      author: authorName.value,
      user_id: 1,
    }
    // NOTE the userID is hard coded until authentication can handle this
    console.log('BOOK NAME:', newBook)

    addBook(newBook)
  })
}
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

// DELETE BOOK
const deleteBook = (id) =>
  fetch(`/api/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

if (window.location.pathname.includes('/bookshelf')) {
  
let addBookBtn
let bookName
let authorName

// convert from test page to real page later

  addBookBtn = document.querySelector('#addBook')
  bookName = document.querySelector('#bookname')
  authorName = document.querySelector('#author')

  addBookBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const newBook = {
      name: bookName.value,
      author: authorName.value,
      user_id: 1,
    }
    // NOTE the userID is hard coded until authentication can handle this
    console.log('BOOK NAME:', newBook)

    addBook(newBook)
  })

  
  
  
  const deleteBtns = document.querySelectorAll('#deleteBtn')

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation() // just in case
      const bookId = btn.parentElement.dataset.bookId
      deleteBook(bookId).then(() => {
        window.location.reload() // <-- janky, but works
      })
    })
  })

  const splitWindowPath = window.location.pathname.split('/bookshelf/') // <-- get user id value of current logged in user
  const userId = Number(splitWindowPath[1]) // <-- save to this
}
