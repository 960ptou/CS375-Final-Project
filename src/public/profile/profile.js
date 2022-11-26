document.getElementById("edit").addEventListener("click", () => {

});

document.getElementById("logout").addEventListener("click", () => {
   //delete from cookie session
   fetch("/cred/logout").then((response) => {
        if (response.status === 200) {
            //redirect to login page
            window.location.href = "/";
        } else {
            console.log("error");
    }})
});

document.getElementById("Add").addEventListener("click", () => {
    window.location.href = "upload.html";
});

let result = document.getElementById("result");
let bkContainer = document.getElementById("container");

document.getElementById("search").addEventListener("click", () => {
    clearContainer();
    getBooks(document.getElementById("books").value);
});

getBooks("private");

function getBooks(queryString){
    fetch(`/search/private?queryString=${queryString || "private"}`).then((response) => {
        if (response.status === 200) {
            response.json().then(body =>{
                let books = body.books;
                books.forEach(bk =>{
                    bkContainer.appendChild(loadBookDiv(bk));
                });
                addXevent();
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

function addXevent(){
    document.querySelectorAll('.close').forEach(e =>{
        e.addEventListener("click", ()=>{
            let relatedBid = e.id;
            if (!confirm(`Are you sure you want to delete the book with id - ${relatedBid}`)){
                return;
            }
            
            fetch("/file/delete",{
                method : "POST",
                body: JSON.stringify({ bookid:relatedBid}),
                headers: {"Content-Type": "application/json"},
              }).then(response=>{
                if(response.status ===200){
                    console.log("success");
                    location.reload();
                }else{
                    response.json().then(error =>{
                        console.log(error);
                    })
                }
            })
        });
    });
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

    // X
    let X = document.createElement("span");
    X.className = "close";
    X.id = book.bookid;

    // linking
    bLink.appendChild(coverImg);
    bLink.appendChild(title);
    bLink.append(author);

    containerDiv.appendChild(X);
    containerDiv.appendChild(bLink);
    containerDiv.appendChild(meta);
    return containerDiv;
}