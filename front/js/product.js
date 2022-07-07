const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null){
    let itemPrice = 0
    let imgUrl, altText, articleName
}

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => handleData(res))

function handleData(kanap){
    const { altTxt, colors, description, imageUrl, name, price } = kanap
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function makePrice(price){
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function makeDescription(description){
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

function makeColors(colors){
    const select = document.querySelector("#colors")
    if (select != null){
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
              
        })
    }
}

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

function handleClick(){
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value

    if (isOrderInvalid(color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
}

function saveOrder(color, quantity){// 
    const key = `${id}-${color}`
    const data = {
      id: id,
      color: color,
      quantity: Number(quantity),
      price: itemPrice,
      imageUrl: imgUrl,
      altTxt: altText, 
      name: articleName
    }
    localStorage.setItem(key, JSON.stringify(data))
}

function oldQuantity(){
    const key = `${kanap.id}-${kanap.color}`
    const oldQuantity = localStorage.getItem(key).quantity
    
    kanap.quantity = Number(kanap.quantity) + Number(oldQuantity)
    localStorage.setItem(key, kanap)
    document.querySelector("...").value = kanap.quantity
    
}


function isOrderInvalid(color, quantity){// si une seule de ces conditions est remplie, msg à l'utilisateur
    if (color == null || color === "" || quantity == null || quantity == 0){
        alert("Sélectionnez une couleur ou une quantité s'il vous plait")
        return true
    }
}

function redirectToCart(){
    window.location.href = "cart.html"
}





