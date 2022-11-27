let styleBar = document.getElementById("style_bar");
let fontSizeBar = document.getElementById("font_size_bar");
let fontFamilySelect = document.getElementById("font_family_select");
let fontColorSelect = document.getElementById("font_color_select");
let backgroundColorSelect = document.getElementById("background_color_select");

textContainer.addEventListener("click", () =>{
    if (styleBar.style.display === "none" || styleBar.style.display === ""){
        styleBar.style.display = "flex";
    }else{
        styleBar.style.display = "none";
    }
})

document.getElementById("font-open").addEventListener("click", ()=>{
    if(fontSizeBar.style.display === "none" || fontSizeBar.style.display ===""){
        fontSizeBar.style.display = "block";
    }else{
        fontSizeBar.style.display = "none";
    }
})

fontSizeBar.addEventListener("change", ()=>{
    localStorage.setItem("fontSize",fontSizeBar.value);
    loadSettings();
})

fontFamilySelect.addEventListener("change", ()=>{
    localStorage.setItem("font",fontFamilySelect.value);
    loadSettings();
})

fontColorSelect.addEventListener("change", ()=>{
    localStorage.setItem("fontColor",fontColorSelect.value );
    loadSettings();
})

backgroundColorSelect.addEventListener("change", ()=>{
    localStorage.setItem("background",backgroundColorSelect.value );
    loadSettings();
})

function loadSettings(){
    let font = localStorage.getItem("font") || fontSizeBar.value;
    let fontSize = localStorage.getItem("fontSize") || fontFamilySelect.value;
    let fontColor = localStorage.getItem("fontColor") || fontColorSelect.value;
    let background = localStorage.getItem("background") || backgroundColorSelect.value;

    textContainer.style.fontFamily = font;
    textContainer.style.fontSize = fontSize +"px";
    textContainer.style.color = fontColor;
    textContainer.style.background = background;

    fontSizeBar.value = fontSize;
    fontFamilySelect.value = font;
    fontColorSelect.value = fontColor;
    backgroundColorSelect.value = background;
}

loadSettings()