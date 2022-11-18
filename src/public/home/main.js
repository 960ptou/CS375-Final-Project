let result = document.getElementById("result");
let bkContainer = document.getElementById("container");

document.getElementById("search").addEventListener("click", () => {
    getBooks(document.getElementById("books").value);
});

getBooks("main");

function getBooks(queryString){
    fetch(`/search?queryString=${queryString}`).then((response) => {
        if (response.status === 200) {
            response.json().then(body =>{
                let books = body.books;
                books.forEach(bk =>{
                    bkContainer.appendChild(loadBookDiv(bk));
                })
            })
        } else {
            result.textContent = "Failed";
            result.classList.add("error");
        }
    });
}

function loadBookDiv(book){
    let bid = book.bookid;
    let bname = book.bookname;
    let blan = book.book_language;

    let containerDiv = document.createElement("div");

    let coverImg = document.createElement("img");
    coverImg.src = `book/${bid}/cover.png`;

    let bLink = document.createElement("a");
    bLink.textContent = bname;
    bLink.href = `book/${bid}/volumes`;

    let meta = document.createElement("div");
    meta.style.display = "none"
    meta.textContent = blan;


    bLink.appendChild(coverImg);
    containerDiv.appendChild(bLink);
    containerDiv.appendChild(meta);
    return containerDiv;
}