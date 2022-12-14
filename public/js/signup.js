if (window.location.pathname.includes('/sign_up')) {
  const newAccountBtn = document.querySelector('#newAccountBtn')

  // NOTE no validation yet
  newAccountBtn.addEventListener('click', (e) => {
    e.preventDefault()
    // simple code to redirect
    window.location.assign('/home')
  })

  // maybe create small modal to tell user their account was created, and to proceed to log in
}


const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#exampleInputEmail1').value.trim();
  const password = document.querySelector('#exampleInputPassword1').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#inputusername4').value.trim();
  const email = document.querySelector('#inputEmail4').value.trim();
  const password = document.querySelector('#inputPassword4').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


// // *********************************
// logout 
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);

