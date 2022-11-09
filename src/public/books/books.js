let textContainer = document.getElementById("content");
let titleH = document.getElementById("titleH");
let pages = 0;
const linesPerPage = 100;
let currentPage = 1;

// At start -> need a way to get data instead
fetch(window.location.pathname, {method : "POST"}).then((response)=>{
    // I will store things text content into local storage.
    if(response.status === 200){
        response.json().then((body) =>{
            localStorage.setItem("text" , body.text);
            localStorage.setItem("title" , body.title);
            // init
            splitTextContent();
            titleH.textContent = localStorage.getItem("title");
            displayText(currentPage);
        })

    }else{
        textContainer.textContent = "FAILED";
    }
});

function splitTextContent(){
    // This function changes localStorage "text"
    // into "text1", "text2" ...
    let lines = [];
    let texts = localStorage.getItem("text");
    // localStorage.removeItem("text");

    for(text of texts.split("\n")){
        lines.push(text);
    }

    // https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
    for(let i = 0; i < Math.ceil(lines.length / linesPerPage); i++){
        localStorage.setItem(`text${i+1}`, JSON.stringify(lines.slice(i*linesPerPage, (i+1)*linesPerPage)) );
        pages += 1;
    }
}

function displayText(page, container = textContainer){
    let title = localStorage.getItem("title");
    titleH.textContent = `${title} (${page})`;
    let thisPageText = JSON.parse(localStorage.getItem(`text${page}`));
    textContainer.textContent = ""; // clear previous content

    for(line of thisPageText){
        let p = document.createElement("p");
        p.textContent = line;
        container.appendChild(p);
    }
}

window.addEventListener('hashchange', () => {
    let pageHash = new URL(document.URL).hash.replace("#", "");;
    displayText(pageHash);
    window.scrollTo(0, 0);
});


document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage === 1){
        // if currentChapter === 1{ to previous chapter}
        // go to previous chapter
    }else{
        currentPage--;
        updateURLhash(currentPage);
    }
    
});


document.getElementById("nextPage").addEventListener("click", () =>{
    if (currentPage === pages){
        // if currentChapter === LastChapter {to next chapter}
        // go to next chapter
    }else{
        currentPage++;
        updateURLhash(currentPage);
    }
})

function updateURLhash(page){
    window.location.hash = String(page);
}