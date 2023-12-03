console.log('Hello X-low!')

const productImg = document.querySelector('#productImg')
const productName = document.querySelector('#productName')
const vitrine = document.querySelector('.vitrine')
const url = 'https://desafio.xlow.com.br/search'
const products = []

const showResult = async (res) => {
  const allProducts = res
  for (let i = 0; i < allProducts.length; i++) { 
    const oneProduct = await getProduct(res[i].productId)
    const urlArray = oneProduct.map(item => {
      return `<img class='smallImg' src=${item.imageUrl} onclick=setImg('${item.imageUrl}',${i}) >`
    })
    const bestPrice = allProducts[i].bestPrice.toString()
    const listPrice = allProducts[i].listPrice.toString()
    vitrine.innerHTML += `<div class='produto'><img id='productImg-${i}' class='productImg' src='${allProducts[i].image}'><div class='imgBox'>${urlArray}</div><p class='productName'>${allProducts[i].productName}</p><div class='priceBox'><p class=${allProducts[i].listPrice !== allProducts[i].bestPrice ? 'productListPrice' : 'hide'}>R$ ${listPrice.substring(0, 2) + ',' + listPrice.substring(2)}</p></div><p class='productBestPrice'>R$ ${bestPrice.substring(0, 2) + ',' + bestPrice.substring(2)}</p><button class='buyButton'>COMPRAR</button></div>`
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

const setImg = (url, index) => {
  document.getElementById(`productImg-${index}`).src=url
}