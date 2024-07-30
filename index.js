(() => { // (() => { content })()


let cardContainer = document.getElementById('card-container')
let frontCard = document.getElementById('front-card')
let backCard = document.getElementById('back-card')

let isCardRotated = false



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


})()