const apiKey = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3M2M1N2FlZGU3ODAwMTU3OTM1NWIiLCJpYXQiOjE3MzE2ODEyNjMsImV4cCI6MTczMjg5MDg2M30.UZFiVQvwHuwNXweYX20OlChYKM0sMFR3c6rvyMlMyOc',
  'Content-Type': 'application/json',
}
const buttonForm = document.getElementById('button-form')
const form = document.getElementById('my-form')
const inputName = document.getElementById('name')
const inputBrand = document.getElementById('brand')
const inputImage = document.getElementById('image')
const inputPrice = document.getElementById('price')
const inputDescription = document.getElementById('description')

const URL1 = 'https://striveschool-api.herokuapp.com/api/product'

buttonForm.addEventListener('click', function (event) {
  event.preventDefault()

  const addProfileObj = {
    name: inputName.value,
    brand: inputBrand.value,
    description: inputDescription.value,
    price: parseInt(inputPrice.value),
    imageUrl: inputImage.value,
  }
  form.reset()
  alert('Rider aggiunto alla crew!')

  fetch(URL1, {
    method: 'POST',
    body: JSON.stringify(addProfileObj),
    headers: apiKey,
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Errore nella richiesta')
      }
      return resp.json()
    })
    .then((createObj) => {
      console.log(createObj)
    })
    .catch((error) => {
      console.error('Errore di fetch:', error)
    })
})

const params = new URLSearchParams(window.location.search)
const productId = params.get('_id')
const URL2 = 'https://striveschool-api.herokuapp.com/api/product/' + productId
console.log(productId)

if (productId) {
  fetch(URL2, {
    method: 'GET',
    headers: apiKey,
  })
    .then((response) => response.json())
    .then((singolObj) => {
      const { name, description, brand, imageUrl, price } = singolObj
      document.getElementById('name').value = name
      document.getElementById('description').value = description
      document.getElementById('brand').value = brand
      document.getElementById('image').value = imageUrl
      document.getElementById('price').value = price
      buttonForm.className = 'd-none'
      modButton = document.createElement('button')
      form.appendChild(modButton)
      modButton.className = 'btn btn-success mx-4'
      modButton.innerText = 'Modifica'

      const deleteButton = document.createElement('button')
      const bu = document.getElementById('for-butt')
      deleteButton.innerText = 'Elimina Prodotto'
      deleteButton.className = 'btn btn-danger h-50 mx-4'
      resetButton = document.createElement('button')
      form.appendChild(resetButton)
      resetButton.className = 'btn btn-dark mx-4'
      resetButton.innerText = 'Reset'

      form.appendChild(deleteButton)
      console.log('bu')

      deleteButton.addEventListener('click', function () {
        deleteProduct()
      })

      modButton.addEventListener('click', function () {
        modProduction()
      })

      resetButton.addEventListener('click', function () {
        form.reset()
      })
    })
}

function deleteProduct() {
  fetch(URL2, {
    method: 'DELETE',
    headers: apiKey,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Errore nella richiesta di eliminazione')
      }
      return response.json()
    })
    .then((deleteObj) => {
      alert('prodotto eliminato con successo')
    })
    .catch((error) => {
      console.error('Errore durante la richiesta di eliminazione:', error)
    })
}

function modProduction() {
  const newProductObj = {
    name: inputName.value,
    brand: inputBrand.value,
    description: inputDescription.value,
    price: parseInt(inputPrice.value),
    imageUrl: inputImage.value,
  }
  fetch(URL2, {
    method: 'PUT',
    body: JSON.stringify(newProductObj),
    headers: apiKey,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Errore nella richiesta di eliminazione')
      }
    })
    .then((Objprod) => {
      alert('prodotto modificato con successo')
    })
    .catch((error) => {
      console.error('Errore durante la richiesta di eliminazione:', error)
    })
}
