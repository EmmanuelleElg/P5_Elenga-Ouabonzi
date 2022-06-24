fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))
// fetch pour récupérer les données

// addproducts ajoute les données demandées, appelle la fonction makeAnchor avec l'URL puis passe à appendChrildren
function addProducts(canapes) {
    canapes.forEach((kanap) => { 
    const { _id, imageUrl, altTxt, name, description } = kanap
    const anchor = makeAnchor(_id)
    const article = document.createElement("article")
    const image = makeImageDiv(imageUrl, altTxt)
    const h3 = makeH3(name)
    const p = makeParagraphe(description)

    appendElementsToArticle(article, image, h3, p)
    appendArticleToAnchor(anchor, article) 

    })
}

function appendElementsToArticle(article, image, h3, p){
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}

// fabrication de anchor
function makeAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}
//trouve le item avec l'élément envoyé, lui rajoute le nchor qu'on lui a donné, s'il le trouve
function appendArticleToAnchor(anchor, article){
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}

function makeImageDiv(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    image.removeAttribute("title")
    image.removeAttribute("style")
    return image
}


function makeH3(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function makeParagraphe(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p 
}
