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

let dateFrom = document.getElementById('dateForm')
let dateCard = document.getElementById('dateCard')

let monthForm = document.getElementById('monthForm')
let yearForm = document.getElementById('yearForm')

let optionSelect = document.getElementsByTagName('option')

let submitForm = document.getElementById('submitForm')

let submitButton = document.getElementById('submitButton')
let formContainer = document.getElementById('formContainer')
let main = document.getElementById('main')
let html = document.getElementById('html')
let animationSubmit = document.getElementById('animationSubmit')







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
let cardColorValid
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

    if (formNumber.value.length>=2) {
        switch(parseInt(firstNumber)) {
            case 4:
                type('#EAF2F8', 'vs')
                cardColorValid = true
            break;
    
            case 5:
                type('#FDEDEC', 'mc')
                cardColorValid = true
            break;
    
            case 3:
                type('#e9e9e9', 'amex')
                cardColorValid = true
            break;
    
            default:
                frontCard.style.transition = 'all 0.3s'
                frontCard.style.background = 'white'
                backCard.style.background = 'white'
                logoType.src = ''
                cardColorValid = false
          }
    } else {
        frontCard.style.transition = 'all 0.3s'
        frontCard.style.background = 'white'
        backCard.style.background = 'white'
        logoType.src = ''
    }



    // if is not vs, mc or amex- color validation
    if (formNumber.value.length == 16 && firstNumber != 4 && firstNumber != 5 && firstNumber != 3) {
        cardTextNumber.style.transition = 'color 0.3s'
        cardTextNumber.style.color = '#fafafa'
    } else {
        cardTextNumber.style.color = 'black'
    }

}


//focus rotations
formNumber.addEventListener('focus', () => {rotateFront()})
nameForm.addEventListener('focus', () => {rotateFront()})
cvvForm.addEventListener('focus', () => {rotateBack()})
cvvForm.addEventListener('blur', () => {rotateFront()})
monthForm.addEventListener('focus', () => {rotateFront()})
yearForm.addEventListener('focus', () => {rotateFront()})





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


// nameForm validation
    // para que solo acepte letras minus y mayus
nameForm.addEventListener('keypress' , (e) => {
    var expre = /[a-zA-Z ]/
    if (!expre.test(e.key)) e.preventDefault()
})

    // se escriba al mismo tiempo
nameForm.addEventListener('input', valorName)

function valorName() {
    nameCard.style.transition = '0.3s'
    nameCard.innerHTML = nameForm.value

    if (nameForm.value == '') {
        
        nameCard.innerHTML = 'First & Last Name'
    }
}



// mm & yy 
monthForm.addEventListener('input', monthSelected)
yearForm.addEventListener('input', yearSelected)


function monthSelected() {

    let posicion = monthForm.selectedIndex
    let mm = document.getElementById('dateMMcard')

    posicion = optionSelect[posicion].value

    if (posicion == 'MM') {
        monthForm.style.color = 'gray'
        mm.innerHTML = posicion
    } else {
        monthForm.style.color = 'black'
        mm.innerHTML = posicion
    }
}


function yearSelected() {

    let posicion = yearForm.selectedIndex
    let yy = document.getElementById('dateYYcard')

    posicion = optionSelect[13 + posicion].value

    if (posicion == 'YY') {
        yearForm.style.color = 'gray'
        yy.innerHTML = posicion

    } else {
        yearForm.style.color = 'black'
        yy.innerHTML = posicion

    }
}






//submit click animation
submitButton.addEventListener('click', validations)

//variables for validations
let nameVali
let cardVali
let monthVali
let yearVali
let cvvVali


// validations
function validations() {

    function errorNonFilled(element) {
        element.style.background = 'red'
        element.style.transition = 'all 250ms'
        element.style.transform = 'scaleY(1.1)'
        element.style.border = 'red'

        element.addEventListener('focus', ()=> {
            element.style.background = 'white'
            element.style.transform = 'scaleY(1)'
        })
    }


        //formNumber validation
    if ( formNumber.value == '' || formNumber.value.slice(0,16).length < 16 || cardColorValid == false) {
        errorNonFilled(formNumber)
    } else {
        nameVali = true
    }
        //nameNumber validation
    if ( nameForm.value == '' || nameForm.value.slice(0,16).length < 1) {
        errorNonFilled(nameForm)
    } else {
        cardVali = true
    }

        //monthForm validation
    if ( monthForm.value == 'MM') {
        errorNonFilled(monthForm)
    } else {
        monthVali = true
    }

        //yearForm validation
    if ( yearForm.value == 'YY') {
        errorNonFilled(yearForm)
    } else {
        yearVali = true
    }

    if ( cvvForm.value == '' || cvvForm.value.slice(0,3).length < 3) {
        errorNonFilled(cvvForm)
        
    } else {
        cvvVali = true
    }


    if (nameVali, cardVali, monthVali, yearVali, cvvVali == true) {
        animation()
    }

}



// submit animation
function animation() {

    document.getElementById('front-1').style.display = 'none'
    document.getElementById('front-2').style.display = 'none'
    document.getElementById('front-3').style.display = 'none'
    cardContainer.style.zIndex = '1'
    cardContainer.style.animation = 'cardAnimation 1s ease'
    frontCard.style.display = 'none'
    backCard.style.display = 'none'

    cardContainer.style.background = frontCard.style.background
    formContainer.style.background = frontCard.style.background
    frontCard.style.animation = 'cardAnimation 1s ease'
    formNumber.style.display = 'none'
    nameForm.style.display = 'none'
    document.getElementById('form-1').style.display = 'none'
    document.getElementById('form-2').style.display = 'none'
    formContainer.style.animation = 'formAnimation 1s ease'
    


    setTimeout(()=>{
        cardContainer.style.top = '160px'
        cardContainer.style.width = '100px'
        cardContainer.style.height = '100px'
        cardContainer.style.borderRadius = '50%'

        frontCard.style.top = '160px'
        frontCard.style.width = '100px'
        frontCard.style.height = '100px'
        frontCard.style.borderRadius = '50%'

        formContainer.style.top = '0px'
        formContainer.style.width = '100px'
        formContainer.style.height = '100px'
        formContainer.style.borderRadius = '50%'

        setTimeout(()=>{
            document.getElementById('check').style.display = 'flex'
            cardContainer.style.transition = '500ms'
            cardContainer.style.background = 'green'
        }, 50)

    },800)

    setTimeout(submit, 2000)
}

function submit() {
    submitForm.click()
}


})()