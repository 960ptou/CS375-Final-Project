let textContainer = document.getElementById("content");
let titleH = document.getElementById("titleH");
let pages = 0;
const linesPerPage = 100;
let bookId;
let currentVol;
let currentArc;
let currentPage = Number(getCurrentHash()) || 1; // 0 -> 1
let maxArcs;
let maxVols;
let displayURLArc = Number(document.URL.split("/").at(-1));
// At start -> need a way to get data instead
fetch(window.location.pathname, {method : "POST"}).then((response)=>{
    // I will store things text content into local storage.
    if(response.status === 200){
        response.json().then((body) =>{
            sessionStorage.setItem("text" , body.text);
            sessionStorage.setItem("title" , body.title);
            // init
            splitTextContent();
            titleH.textContent = sessionStorage.getItem("title");
            displayText(currentPage);
            bookId = body.bookid;

            currentVol = Number.parseInt(body.volume);
            currentArc = Number.parseInt(body.arc);
            maxArcs = Number.parseInt(body.maxArcs);
            maxVols = Number.parseInt(body.maxVol);
            if (displayURLArc > maxArcs){
                redirectToDifferentPage(bookId, currentVol, maxArcs, false);
            }
            document.getElementById("prevPage").addEventListener("click", previousPage);
            document.getElementById("nextPage").addEventListener("click", nextPage);
        })
    }else{
        textContainer.textContent = "FAILED"; // redirect to main page later
    }
});

function splitTextContent(){
    // This function changes sessionStorage "text"
    // into "text1", "text2" ...
    let lines = [];
    let texts = sessionStorage.getItem("text");
    sessionStorage.removeItem("text");

    for(text of texts.split("\n")){
        lines.push(text);
    }

    // https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-sessionStorage
    for(let i = 0; i < Math.ceil(lines.length / linesPerPage); i++){
        sessionStorage.setItem(`text${i+1}`, JSON.stringify(lines.slice(i*linesPerPage, (i+1)*linesPerPage)) );
        pages += 1;
    }
}

function displayText(page, container = textContainer){
    // https://stackoverflow.com/questions/4607745/split-string-only-on-first-instance-of-specified-character
    let title = sessionStorage.getItem("title");
    title = title.replace(".txt", "").replaceAll("_", " ");
    titleH.textContent = `${title} ${page == 1 ? "" : `(${page})` }`; // == over === because the type changes.
    let thisPageText = JSON.parse(sessionStorage.getItem(`text${page}`));
    textContainer.textContent = ""; // clear previous content

    for(line of thisPageText){
        let p = document.createElement("p");
        p.textContent = line;
        container.appendChild(p);
    }
}

window.addEventListener('hashchange', () => {
    let pageHash = getCurrentHash();
    currentPage = Number.parseInt(pageHash);
    displayText(pageHash);
    window.scrollTo(0, 0);
});



function previousPage(){
    if (currentPage === 1){ // already first page of arc
        // go to previous chapter
        if (currentArc === 1){
            if (currentVol === 1){
                redirectToDifferentPage(bookId); // To book page
            }else{
                redirectToDifferentPage(bookId, currentVol - 1, 99999); // server force previous vol last arc
            }
        }else{
            redirectToDifferentPage(bookId, currentVol, currentArc - 1);
        }
    }else{
        currentPage--;
        updateURLhash(currentPage);
    }  
}

function nextPage(){
    if (currentPage >= pages){
        if(currentArc === maxArcs ){
            if (currentVol + 1 === maxVols){
                redirectToDifferentPage(bookId); // To book page
            }else{
                redirectToDifferentPage(bookId, currentVol + 1, 1); 
            }
        }else{
            redirectToDifferentPage(bookId, currentVol, currentArc + 1);
        }
    }else{
        currentPage++;
        updateURLhash(currentPage);
    }
}



document.getElementById("volumes").addEventListener("click", (evt)=>{
    redirectToDifferentPage(bookId);
})


function updateURLhash(page){
    window.location.hash = String(page);
}

function getCurrentHash(){
    return new URL(document.URL).hash.replace("#", "");
}

function redirectToDifferentPage(bid, bvol, barc, retrack = true){
    let newURL;
    if (barc && bvol){
        newURL = `/book/${bid}/${bvol}/${barc}`;
    }else{
        newURL = `/book/${bid}/volumes`; // server path for different
    }
    retrack ? window.location.href = newURL : window.location.replace(newURL);
}



// Some UX
document.onkeydown = (evt) => {
    let code = evt.keyCode;
    if (code === 37){// left
        document.getElementById("prevPage").click();
    }else if(code === 39){ // right
        document.getElementById("nextPage").click();
    }
}