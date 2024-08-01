(() => { // (() => { content })()


let cardContainer = document.getElementById('card-container')
let frontCard = document.getElementById('front-card')
let backCard = document.getElementById('back-card')

let isCardRotated = false

let formNumber = document.getElementById('form-number')
let cardTextNumber = document.getElementById('card-text-number')

let logoType = document.getElementById('type')


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
formNumber.addEventListener('input', cardNumberInteration)

function cardNumberInteration() {
    let valor = formNumber.value
    valor = valor.slice(0, 16).match(/.{0,4}/g)
    valor = valor.join(' ')
    cardTextNumber.innerHTML = valor

    if (formNumber.value.length> 0) {
        formNumber.value = formNumber.value.slice(0, 16)
    }

    if (formNumber.value == '') {
        cardTextNumber.innerHTML = '**** **** **** ****'
        console.log('valor 0');
    }


    // card type (vs, mc, amex)
    let firstNumber = formNumber.value
    firstNumber = firstNumber.toString().charAt(0) 

    function type(color, card) {
        frontCard.style.transition = 'all 0.3s'
        frontCard.style.background = color
        backCard.style.background = color
        logoType.style.transition = 'all 0.3s'
        logoType.src = './img/'+ card +'.png'
    }

    switch(parseInt(firstNumber)) {
        case 4:
            type('blue', 'visa')
        break;

        case 5:
            type('red', 'masterCard')
        break;

        case 3:
            type('white', 'amex')
        break;

        default:
            frontCard.style.transition = 'all 0.3s'
            frontCard.style.background = 'gray'
            backCard.style.background = 'gray'
            logoType.src = ''
      }

}



})()