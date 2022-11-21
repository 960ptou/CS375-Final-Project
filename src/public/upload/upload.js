//selecting all required elements
const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("header");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("input");
const btn = document.getElementById("upload");
let formData;
let bookAry = [];

btn.click(function () {
  const author = document.getElementById("auth").value;
  const language = document.getElementById("language").value;
  const name = document.getElementById("bkname").value;
  const private = document.getElementById("private").checked;
  const genre = document.getElementById("gen").value;
  
  const user = fetch("/loggedin").then((response) => {
    if (response.status === 200) {
      response.json().then(body => {
        return body.userid;
      })
    } else {
      return null;
    }
  });
})


button.onclick = () => {
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  formData = new FormData();
  bookAry = [];
  for(let i =0; i <this.files.length; i++){
    let file = this.files[i];
    formData.append(file.webkitRelativePath, file)
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
      form.append(path + file.name, file);
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

  if(items[0]){
    let item = items[0].webkitGetAsEntry();
    traverseFileTree(item, "", formData);
  }
  showFile(); //calling function
}

function showFile() {


}