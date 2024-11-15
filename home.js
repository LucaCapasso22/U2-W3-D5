const apiKey = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3M2M1N2FlZGU3ODAwMTU3OTM1NWIiLCJpYXQiOjE3MzE2ODEyNjMsImV4cCI6MTczMjg5MDg2M30.UZFiVQvwHuwNXweYX20OlChYKM0sMFR3c6rvyMlMyOc',
  'Content-Type': 'application/json',
}
window.onload = () => {
  const URL = 'https://striveschool-api.herokuapp.com/api/product'

  fetch(URL, {
    method: 'GET',
    headers: apiKey,
  })
    .then((resp) => resp.json())
    .then((productObj) => {
      console.log(productObj)
      const main = document.getElementById('main')
      productObj.forEach((product) => {
        innerHTML = ``
        const row = document.getElementById('row')
        const div = document.createElement('div')
        div.className = ' col col-12 col-sm-6 col-md-4 col-lg-3 mt-2 '
        const cardDiv = document.createElement('div')
        cardDiv.className = 'card h-100 rounded'
        const img = document.createElement('img')
        img.className =
          'card-img-top w-100 object-fit-cover rounded shadow-sm p-3 w-25'
        img.src = product.imageUrl
        const cardBody = document.createElement('div')
        cardBody.className = 'card-body my-auto '
        const h5 = document.createElement('h5')
        h5.innerText = product.name
        h5.className = 'card-title'
        const p = document.createElement('p')
        p.innerText = `Età: ${product.price} Anni - Trick Preferito: ${product.description}`
        p.className = 'card-text justify-content-around'
        const a = document.createElement('a')
        a.className = 'btn btn-primary mx-2'
        a.innerText = 'Modifica'
        a.href = 'backoffice.html?_id=' + product._id
        info = document.createElement('a')
        info.innerText = 'Scopri di piu'
        info.className = 'btn btn-dark mx-2'
        info.href = 'info.html?_id=' + product._id

        row.appendChild(div)
        div.appendChild(cardDiv)
        cardDiv.appendChild(img)
        cardDiv.appendChild(cardBody)
        cardBody.appendChild(h5)
        cardBody.appendChild(p)
        cardBody.appendChild(a)
        cardBody.appendChild(info)
      })
    })
    .catch((error) => {
      console.error('Errore durante la richiesta fetch:', error)
    })
}
