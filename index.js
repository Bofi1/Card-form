(() => { // (() => { content })()


let cardContainer = document.getElementById('card-container')
let frontCard = document.getElementById('front-card')
let backCard = document.getElementById('back-card')

let isCardRotated = false

let formNumber = document.getElementById('form-number')
let cardTextNumber = document.getElementById('card-text-number')



// card rotate
cardContainer.addEventListener('click', turnCard)

function turnCard() {

    if (!isCardRotated) {
        cardContainer.style.transition = '300ms'
        cardContainer.style.transform = 'rotateY(180deg)'
        backCard.style.transform = 'rotateY(180deg)'
        isCardRotated = true
        setTimeout(() => {backCard.style.backfaceVisibility = 'visible'}, 100)
       
    } else{
        cardContainer.style.transition = '300ms'
        cardContainer.style.transform = 'rotateY(0deg)'
        backCard.style.transform = 'rotateY(180deg)'
        isCardRotated = false
        setTimeout(() => {backCard.style.backfaceVisibility = 'hidden'}, 100)
    }
}



// card & form number
formNumber.addEventListener('input', hola)

function hola() {
    let valor = formNumber.value
    valor = valor.slice(0, 16).match(/.{1,4}/g)
    valor = valor.join(' ')
    cardTextNumber.innerHTML = valor

    if (formNumber.value.length> 1) {
        formNumber.value = formNumber.value.slice(0, 16)
    }

    if (formNumber.value == '') {
        cardTextNumber.innerHTML = '**** **** **** ****'
    }
}




})()