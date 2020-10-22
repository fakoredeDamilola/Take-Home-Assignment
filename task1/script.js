//declare all variables 
let form = document.querySelector("form");
let invoicePopup = document.querySelector('.invoice-popup');
let invoicePopupCancelBtn = document.querySelector('.invoice-popup-cancelBtn');
let invoiceData = document.querySelector('.invoice-data');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let tab = document.querySelectorAll(".tab");
let submit = document.querySelector(".submit");
let indicators = document.querySelectorAll(".indicators span");
let orderData = document.querySelector(".order-data");
let orderInformation = document.querySelector(".order-information");
let counter = 0
let dataValue = [false, false, false, false, false, false, false, false]
let dataCompleted = false
let userInvoice = {
    invoiceNumber: "",
    invoiceDescription: "",
    invoiceAmount: "",
    orderNumber: "",
    salesAgent: "",
    invoiceDate: "",
    deliveryDate: "",
    settleDate: "",
    invoiceVat: "",
    currency: "",
    exchangeRate: "",
    client: "",


};
let textForms = document.querySelectorAll(".invoice-textbox input");
let selectForms = document.querySelectorAll(".invoice-selectbox select");

document.addEventListener("DOMContentLoaded", () => {
    changeCurrentPage()
    changeIndicatorColor(counter)
})

//add eventlistener to order-informationbutton
submit.addEventListener("click", submitForm);
invoicePopupCancelBtn.addEventListener("click", removePopup)
next.addEventListener("click", (e) => {
    e.preventDefault()
    changeNumber(1)
})
prev.addEventListener("click", (e) => {
    e.preventDefault()
    changeNumber(-1)
})



//functions
function changeIndicatorColor(counter) {
    indicators.forEach(indicator => {
        indicator.classList.remove("animation")
    })
    indicators[counter].classList.add("animation")
}
function submitForm(e) {
    e.preventDefault();
    textForms.forEach(text => {
        userInvoice[text.id] = text.value
    })
    selectForms.forEach(select => {
        userInvoice[select.id] = select.value
    })
    Object.keys(userInvoice).forEach((key, index) => {
        if (userInvoice[key] === "") {
            dataValue[index] = false
        } else {
            dataValue[index] = true
        }
    })
    if (dataValue.every(value => value === true)) {
        invoiceData.innerHTML = "Data completed, get your checkout recipt below"
        orderInformation.style.display = 'block'
        createCheckoutForm()

    } else {
        invoiceData.innerHTML = "Please fill all the information. Go through the form again"
    }
    invoicePopup.style.display = "flex"
}
function removePopup() {
    invoicePopup.style.display = "none"
}
function changeCurrentPage(e) {
    tab.forEach(tabs => {
        tabs.style.display = "none"
    })
    tab[counter].style.display = "grid"
    if (counter === 2) {
        next.style.display = "none"
        submit.style.display = "block"
    } else {
        next.style.display = "block"
        submit.style.display = "none"
    }

    if (counter === 0) {
        prev.style.display = "none"
    } else {
        prev.style.display = "block"
    }


}
function changeNumber(n) {
    if (n === 1) {
        counter += 1
        changeCurrentPage()
        changeIndicatorColor(counter)
    } else if (n === -1) {
        counter -= 1
        changeCurrentPage()
        changeIndicatorColor(counter)
    }
}
function createCheckoutForm() {
    orderData.innerHTML = ""
    Object.keys(userInvoice).forEach(prop => {
        let element = createElement(prop)
        orderData.appendChild(element)

    })
}

function createElement(prop) {
    let orderContainer = document.createElement("div")
    let orderContent = document.createElement("div")
    let orderValue = document.createElement("div")
    orderContainer.className = "orderContainer"
    orderContent.className = "orderContent"
    orderValue.className = "orderValue"
    orderValue.appendChild(document.createTextNode(userInvoice[prop]))
    orderContent.appendChild(document.createTextNode(prop.split(/(?=[A-Z])/).join(" ")))
    orderContainer.appendChild(orderContent)
    orderContainer.appendChild(orderValue)
    return orderContainer
}