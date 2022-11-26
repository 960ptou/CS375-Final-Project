let result = document.getElementById("result");
let bkContainer = document.getElementById("container");

document.getElementById("search").addEventListener("click", () => {
    clearContainer();
    getBooks(document.getElementById("books").value);
});

getBooks("main");

fetch("/cred/loggedin").then(response => {
    if(response.status === 200){
        document.getElementById("loggedin").style.display = "block";
    }else{
        document.getElementById("notlogged").style.display = "block";
    }
})

function getBooks(queryString){
    fetch(`/search?queryString=${queryString || "main"}`).then((response) => {
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

function clearContainer(){
    while(bkContainer.firstChild){
        bkContainer.firstChild.remove();
    }
}

function loadBookDiv(book){
    let containerDiv = document.createElement("div");

    // title
    let title = document.createElement("span");
    title.className = "title"
    title.textContent = book.bookname.replaceAll("_", " ");

    // author
    let author = document.createElement("span");
    author.className = "author";
    author.textContent = book.author;

    // set image
    let coverImg = document.createElement("img");
    coverImg.className = "cover"
    coverImg.src = `book/${book.bookid}/cover.png`;

    // set link
    let bLink = document.createElement("a");
    bLink.className = "book-url"
    bLink.href = `book/${book.bookid}/volumes`;

    // meta info -> not to be shown
    let meta = document.createElement("div");
    meta.className = "meta";
    meta.style.display = "none"
    meta.textContent = book.book_language;

    // linking
    bLink.appendChild(coverImg);
    bLink.appendChild(title);
    bLink.append(author);


    containerDiv.appendChild(bLink);
    containerDiv.appendChild(meta);
    return containerDiv;
}