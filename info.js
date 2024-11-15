const params = new URLSearchParams(window.location.search)
const productId = params.get('_id')
const URL2 = 'https://striveschool-api.herokuapp.com/api/product/' + productId
const apiKey = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3M2M1N2FlZGU3ODAwMTU3OTM1NWIiLCJpYXQiOjE3MzE2ODEyNjMsImV4cCI6MTczMjg5MDg2M30.UZFiVQvwHuwNXweYX20OlChYKM0sMFR3c6rvyMlMyOc',
  'Content-Type': 'application/json',
}

if (productId) {
  fetch(URL2, {
    method: 'GET',
    headers: apiKey,
  })
    .then((response) => response.json())
    .then((singolObj) => {
      document.getElementById('name').innerText = singolObj.name
      console.log(singolObj)
      document.getElementById('brand').innerText = singolObj.brand
      document.getElementById('description').innerText = singolObj.description
      document.getElementById('price').innerText = singolObj.price
    })
    .catch((error) => {
      console.error(
        'Errore durante la richiesta di dettagli del prodotto:',
        error
      )
    })
}
