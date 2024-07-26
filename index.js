(() => { // (() => { content })()


let cardContainer = document.getElementById('card-container')
let frontCard = document.getElementById('front-card')
let backCard = document.getElementById('back-card')

let isCardRotated = false



cardContainer.addEventListener('click', turnCard)

function turnCard() {

    if (!isCardRotated) {
        cardContainer.style.transition = '.3s'
        cardContainer.style.transform = 'rotateY(180deg)'
        backCard.style.backfaceVisibility = 'visible'
        backCard.style.transform = 'rotateY(180deg)'
        isCardRotated = true
       
    } else{
        cardContainer.style.transition = '.3s'
        cardContainer.style.transform = 'rotateY(0deg)'
        backCard.style.backfaceVisibility = 'hidden'
        backCard.style.transform = 'rotateY(180deg)'
        isCardRotated = false
    }
}


})()