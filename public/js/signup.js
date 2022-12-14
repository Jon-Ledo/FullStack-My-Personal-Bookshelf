if (window.location.pathname.includes('/sign_up')) {
  const newAccountBtn = document.querySelector('#newAccountBtn')

  // NOTE no validation yet
  newAccountBtn.addEventListener('click', (e) => {
    e.preventDefault()
    // simple code to redirect
    window.location.assign('/')
  })

  // maybe create small modal to tell user their account was created, and to proceed to log in
}
