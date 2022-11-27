
//selecting all required elements
const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("header");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("input");
const btn = document.getElementById("upload");
let formData;
let bookAry = [];
let gens = [];

btn.addEventListener("click",  ()=>{
  const bkauthor = document.getElementById("author").value;
  const bklanguage = document.getElementById("language").value;
  const bktitle = document.getElementById("name").value;
  const bkprivate = document.getElementById("private").checked;

  let metaInfo = {
    author : bkauthor,
    language : bklanguage,
    title : bktitle,
    private : bkprivate,
    genres : gens,
  }
  console.log(metaInfo);
  formData.append("meta", JSON.stringify(metaInfo));
  fetch("/file/upload", {
    method : "POST",
    body:formData,
    'Content-Type':'multipart/form-data',
    "accept-charset": "utf-8",
  }).then((response)=>{
    if (response.status === 200){
      alert("You have successfully uploaded");
      window.location.href = "profile.html";
    }else{
      response.json().then((err)=>{
        alert(err.error, "please upload again");
      })
    }
    formData = new FormData();
  })
})

let genresBox = document.getElementById("genres")
let displayGenres = document.getElementById("selected-genres");
genresBox.addEventListener("change", ()=>{
  let displayDiv = document.createElement("div");
  if (gens.length >= 5 || gens.includes(genresBox.value)){
      genresBox.value = "";
      return;
  }
  displayDiv.textContent = genresBox.value;
  displayGenres.appendChild(displayDiv);
  gens.push(genresBox.value)
  genresBox.value = "";
});


button.onclick = () => {
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  formData = new FormData();
  bookAry = [];
  for(let i =0; i <this.files.length; i++){
    let file = this.files[i];
    formData.append(encodeURI(file.webkitRelativePath), file)
    bookAry.push(file.webkitRelativePath)
  }
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});


// https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree
function traverseFileTree(item, path, form) {
  path = path || "";
  if (item.isFile) {
    item.file(function (file) {
      form.append(encodeURI(path + file.name), file);
      bookAry.push(path + file.name);
    });
  } else if (item.isDirectory) {
    let dirReader = item.createReader();
    dirReader.readEntries(function (entries) {
      for (let i = 0; i < entries.length; i++) {
        traverseFileTree(entries[i], path + item.name + "/", form);
      }
    });
  }
}

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  let items = event.dataTransfer.items;
  loadFiles(items);
}, false);


function loadFiles(items){
  formData = new FormData();
  bookAry = []

  if(items[0]){
    let item = items[0].webkitGetAsEntry();
    traverseFileTree(item, "", formData);
  }
  showFile(); //calling function
}

function showFile() {


}