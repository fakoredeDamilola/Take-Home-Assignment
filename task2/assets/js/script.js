//get all variables
let inputBox = document.querySelector(".inputBox"),
    country = document.querySelector(".country"),
    aside = document.querySelectorAll(".aside a"),
    bodyCategories = document.querySelector(".bodyCategories span"),
    bodyTextSnippet = document.querySelector(".bodyTextSnippet"),
    bodyPicture = document.querySelector(".bodyPicture"),
    volumeTitle = document.querySelector(".volumeTitle"),
    author = document.querySelector(".author"),
    bodyTitle = document.querySelector(".bodyTitle"),
    pages = document.querySelector(".pages"),
    publish = document.querySelector(".publish"),
    publisher = document.querySelector(".publisher"),
    category = document.querySelector(".category"),
    read = document.querySelector(".read"),
    freeDownload = document.querySelector(".freeDownload"),
    menuToggle = document.querySelector(".menu-toggle"),
    searching = document.querySelector(".searchIcon"),
    searchBtn = document.querySelector(".searchbtn"),
    closebtn = document.querySelector(".closebtn"),
    searchDiv = document.querySelector(".search-div");

//event listeners
document.addEventListener("DOMContentLoaded", async function () {
    let data = await fetchData("0747532699")
    populateUI(data)
})
searchBtn.addEventListener("click", async function () {
    searchDiv.classList.remove("showSearch");
    if (inputBox.value === "") {
        alert("please type something into the inputBox")
    } else {
        let data = await fetchData(inputBox.value)
        if (data.totalItems === 0) {
            alert("no book with this ISBN")
        } else {
            populateUI(data)
        }
    }

})
// header

closebtn.addEventListener("click", function () {
    searchDiv.classList.remove("showSearch");
});
searching.addEventListener("click", function () {
    searchDiv.classList.add("showSearch");
});
let showNav = (e) => {
    let menu = document.querySelector(".menu");
    menu.classList.toggle("active");
};
menuToggle.addEventListener("click", showNav);


//functions
async function fetchData(isbn) {
    let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    let data = await res.json()
    return data

}
function populateUI(data) {
    let { items } = data
    let item = items[0]
    country.innerHTML = item.accessInfo.country
    bodyTextSnippet.innerHTML = item.searchInfo.textSnippet
    author.innerHTML = item.volumeInfo.authors[0]
    bodyTitle.innerHTML = item.volumeInfo.title
    pages.innerHTML = item.volumeInfo.pageCount
    publish.innerHTML = item.volumeInfo.publishedDate
    publisher.innerHTML = item.volumeInfo.publisher
    category.innerHTML = item.volumeInfo.categories[0]
    read.href = item.accessInfo.webReaderLink
    freeDownload.href = item.volumeInfo.previewLink
    bodyCategories.innerHTML = item.volumeInfo.categories[0]
}
//get all links
aside.forEach((link, index) => {
    link.addEventListener("click", async function (e) {
        let data = await fetchData(link.dataset.isbn)
        bodyPicture.style.backgroundImage = `url('${link.dataset.image}')`
        populateUI(data)
    })
})
