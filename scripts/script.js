const vitrine = document.querySelector('.vitrine')
const contador = document.querySelector('.contador')
const footer = document.querySelector('.footer')
const url = 'https://desafio.xlow.com.br/search'
const products = []
let permanece = true
let divide = false

const showResult = async (res) => {
  const allProducts = res
  if (permanece) {
    contador.innerHTML += `<h2>Fo${allProducts.length !== 1 ? 'ram' : 'i'} encontrado${allProducts.length !== 1 ? 's' : ''} ${allProducts.length} produto${allProducts.length !== 1 ? 's' : ''}</h2><button class="buyButton viewButton" onClick=change()>Alterar Visualização</button>`
  }
  for (let i = 0; i < allProducts.length; i++) { 
    const oneProduct = await getProduct(res[i].productId)
    const urlArray = oneProduct.map(item => {
      return `<img class='smallImg' src=${item.imageUrl} alt='${item.imageText.replace(/-/g, ' ')}' onclick=setImg('${item.imageUrl}',${i}) >`
    })
    const bestPrice = allProducts[i].bestPrice.toString()
    const listPrice = allProducts[i].listPrice.toString()

    if (divide) {      
      vitrine.innerHTML += `<div class='produtoMaior'><div class='detailsBox'><img id='productImg-${i}' class='productImg' src='${allProducts[i].image}' alt='${allProducts[i].productName}'><p class='productName'>${allProducts[i].productName}</p></div><div class='productBody'><div class='imgBox'>${urlArray}</div><div class='priceBox'><p class=${allProducts[i].listPrice !== allProducts[i].bestPrice ? 'productListPrice' : 'hide'}>R$ ${listPrice.substring(0, 2) + ',' + listPrice.substring(2)}</p><p class='productBestPrice'>R$ ${bestPrice.substring(0, 2) + ',' + bestPrice.substring(2)}</p></div><button class='buyButton'>COMPRAR</button></div></div>`
    } else {
      vitrine.innerHTML += `<div class='produto'><div class='detailsBox'><img id='productImg-${i}' class='productImg' src='${allProducts[i].image}' alt='${allProducts[i].productName}'><p class='productName'>${allProducts[i].productName}</p></div><div class='productBody'><div class='imgBox'>${urlArray}</div><div class='priceBox'><p class=${allProducts[i].listPrice !== allProducts[i].bestPrice ? 'productListPrice' : 'hide'}>R$ ${listPrice.substring(0, 2) + ',' + listPrice.substring(2)}</p><p class='productBestPrice'>R$ ${bestPrice.substring(0, 2) + ',' + bestPrice.substring(2)}</p></div><button class='buyButton'>COMPRAR</button></div></div>`
    }
  }
}

const getArrayItems = async (res) => {
  const arr = await res
  const images = []
    for (let j = 0; j < arr.length; j++) {
      for (let l = 0; l < arr[j].images.length; l++) {
        images.push(arr[j].images[l])
      }
    }
    return images
}

const getProducts = async () => {
  try {
      const response = await fetch(url, {
          method: 'GET', headers: {
              'X-Powered-By': 'Express',
              'Content-Type': 'application/json',
              'Connection': 'keep-alive',
              'Keep-Alive': 'timeout=5'
          }
      })
      if (response.ok) {
        const result = await response.json()
        showResult(result)
      }
  } catch (error) {
      console.log(error)
      return
  }
}

getProducts()

const getProduct = async (id) => {
  try {
      const response = await fetch(`${url}/${id}`, {
          method: 'GET', headers: {
              'X-Powered-By': 'Express',
              'Content-Type': 'application/json',
              'Connection': 'keep-alive',
              'Keep-Alive': 'timeout=5'
          }
      })
      if (response.ok) {
        const result = await response.json()
        return getArrayItems(result.items)
      }
  } catch (error) {
      console.log(error)
      return
  }
}

const change = () => {
  divide = !divide
  permanece = false
  vitrine.innerHTML = ''
  if (divide) {
    document.getElementById('vitrine').style = 'flex-wrap: wrap'
  } else {
    document.getElementById('vitrine').style = 'flex-wrap: no-wrap'
  }
  getProducts()
}

const setImg = (url, index) => {
  document.getElementById(`productImg-${index}`).src=url
}
