(() => { // (() => { content })()

//variables
let cardContainer = document.getElementById('card-container')
let frontCard = document.getElementById('front-card')
let backCard = document.getElementById('back-card')

let isCardRotated = false

let formNumber = document.getElementById('form-number')
let cardTextNumber = document.getElementById('card-text-number')

let logoType = document.getElementById('type')

let cvvForm = document.getElementById('cvvForm')
let cvvCard = document.getElementById('cvvCard')

let nameForm = document.getElementById('nameForm')
let nameCard = document.getElementById('nameCard')






// funcion para mostrar parte de atras de la tarjeta
function rotateFront() {

    frontCard.style.transition = `300ms`
    backCard.style.transition = `300ms`
    frontCard.style.transform = 'rotateY(0deg)'
    backCard.style.transform = 'rotateY(180deg)'
    isCardRotated = false
    
}

// funcion para mostrar parte de atras de la tarjeta
function rotateBack() {

    frontCard.style.transition = `300ms`
    backCard.style.transition = `300ms`
    frontCard.style.transform = 'rotateY(180deg)'
    backCard.style.transform = 'rotateY(0deg)'
    isCardRotated = true
    
}


// card rotate
cardContainer.addEventListener('click', turnCard)

function turnCard() {

    if (!isCardRotated) {
        rotateBack()
       
    } else{
        rotateFront()
    }
}



// card number validation
formNumber.addEventListener('input', cardNumberInteration)

function cardNumberInteration() {
    let valor = formNumber.value
    valor = valor.slice(0, 16).match(/.{0,4}/g)
    valor = valor.join(' ')
    cardTextNumber.innerHTML = valor

    if (formNumber.value.length> 0) {
        cardTextNumber.style.fontWeight = '500px'
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
                type('#e9e9e9', 'amex')
            break;
    
            default:
                frontCard.style.transition = 'all 0.3s'
                frontCard.style.background = 'white'
                backCard.style.background = 'white'
                logoType.src = ''
          }
    } else {
        frontCard.style.transition = 'all 0.3s'
        frontCard.style.background = 'white'
        backCard.style.background = 'white'
        logoType.src = ''
    }



    // if is not vs, mc or amex- all gray
    if (formNumber.value.length == 16 && firstNumber != 4 && firstNumber != 5 && firstNumber != 3) {
        cardTextNumber.style.transition = 'color 0.3s'
        cardTextNumber.style.color = '#fafafa'
    } else {
        cardTextNumber.style.color = 'black'
    }

}


//focus rotate
formNumber.addEventListener('focus', () => {rotateFront()})
nameForm.addEventListener('focus', () => {rotateFront()})
cvvForm.addEventListener('focus', () => {rotateBack()})



// cvv validation
cvvForm.addEventListener('input', cvv)

function cvv() {
    let valor = cvvForm.value
    valor = valor.slice(0,3)
    cvvCard.innerHTML = valor
    
    if (valor>0) {
        cvvCard.style.fontSize = '25px'
        cvvCard.style.top = '2.5px'
        cvvForm.value = cvvForm.value.slice(0, 3)
    } else  {
        cvvCard.style.fontSize = '45px'
        cvvCard.style.top = '9px'
        cvvCard.innerHTML = '***'
    }

}


// name validation
    // para que solo acepte letras minus y mayus
// nameForm.addEventListener('keypress' , (e) => {
//     var expre = /[a-zA-Z ]/
//     if (!expre.test(e.key)) e.preventDefault()
// })

nameForm.addEventListener('keyup', valorName)

function valorName() {
    nameCard.innerHTML = nameForm.value
}


})()