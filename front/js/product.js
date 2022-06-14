const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => handleData(res))

function handleData(kanap){
    //const altTxt = kanap.altTxt
    //const colors = kanap.colors
    //const description = kanap.description
    //const imageUrl = kanap.imageUrl
    //const name = kanap.name
    //const price = kanap.price
    //const _id = kanap._id
    const { altTxt, colors, description, imageUrl, name, price } = kanap
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageURL, altTxt){
    const image = document.createElement("img")
    image.src = imageURL
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
    if (price != null) span.textContent = price
}

function makeDescription(description){
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

function makeColors(colors){
    const select = document.querySelector("#colors")
    if (select != null){
        colors.forEach((colors) => {
            const option = document.createElement("option")
            option.textContent = colors
            select.appendChild(option)
              
        })
    }
}