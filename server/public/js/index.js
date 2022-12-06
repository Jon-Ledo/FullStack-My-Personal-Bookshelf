console.log('test connection')

// -------------- test api calls  --------------------

fetch('https://localhost:3001')
  .then((response) => response.json())
  .then((data) => console.log(data))
