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

        cardTextNumber.style.transition = ''
        cardTextNumber.style.fontSize = '25px'
    }


    if (formNumber.value == '') {
        cardTextNumber.style.transition = 'all 0.3s'
        cardTextNumber.innerHTML = '**** **** **** ****'
        cardTextNumber.style.fontSize = '30px'
        frontCard.style.background = '#99A3A4'
        backCard.style.background = '#99A3A4'
        logoType.src = ''
    }


    // card type (vs, mc, amex)
    let firstNumber = formNumber.value
    firstNumber = firstNumber.toString().charAt(0) 

    function type(color, card) {
        frontCard.style.transition = 'all 0.5s'
        frontCard.style.background = color
        backCard.style.background = color
        logoType.style.transition = 'all 0.3s'
        logoType.src = `./img/${card}.png`
    }

    if (formNumber.value.length==16) {
        switch(parseInt(firstNumber)) {
            case 4:
                type('#EAF2F8', 'vs')
            break;
    
            case 5:
                type('#FDEDEC', 'mc')
            break;
    
            case 3:
                type('#FBFCFC', 'amex')
            break;
    
            default:
                frontCard.style.transition = 'all 0.3s'
                frontCard.style.background = '#99A3A4'
                backCard.style.background = '#99A3A4'
                logoType.src = ''
          }
    } else {
        frontCard.style.transition = 'all 0.3s'
        frontCard.style.background = '#99A3A4'
        backCard.style.background = '#99A3A4'
        logoType.src = ''
    }



    // if is not vs, mc or amex- all gray
    if (formNumber.value.length == 16 && firstNumber != 4 && firstNumber != 5 && firstNumber != 3) {
        cardTextNumber.style.transition = 'all 0.2s'
        cardTextNumber.style.color = 'gray'
    } else {
        cardTextNumber.style.transition = 'all 0.2s'
        cardTextNumber.style.color = '#1E1E1E'
    }




}







})()