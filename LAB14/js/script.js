let html = document.querySelector("html");
let lightButton = document.querySelector(".theme-button-light");
let darkButton = document.querySelector(".theme-button-dark");
let textureButton = document.querySelector(".theme-button-texture");
let cadrlist = document.querySelector(".card-view-button.tile");
let cardbigslider = document.querySelector(".card-view-button.standard");
let cardsmallslider = document.querySelector(".card-view-button.compact");
let cards = document.querySelector(".cards");

function LightTheme(){
    darkButton.classList.remove("active");
    textureButton.classList.remove("active");
    lightButton.classList.add("active");
    html.setAttribute("data-theme-name", "light");
}

function DarkTheme(){
    lightButton.classList.remove("active");
    textureButton.classList.remove("active");
    darkButton.classList.add("active");
    html.setAttribute("data-theme-name", "dark");
}

function TextureTheme(){
    lightButton.classList.remove("active");
    darkButton.classList.remove("active");
    textureButton.classList.add("active");
    html.setAttribute("data-theme-name", "texture");
}

function Cards(){
cards.classList.remove('standard','compact');cards.classList.add('tile');
cardbigslider.classList.remove('active');cardsmallslider.classList.remove('active');cadrlist.classList.add('active');
}
function Cards1(){
      cards.classList.remove('tile','compact');cards.classList.add('standard');
      cadrlist.classList.remove('active');cardsmallslider.classList.remove('active');cardbigslider.classList.add('active');
}
function Cards2(){
      cards.classList.remove('tile','standard') ;cards.classList.add('compact');
      cadrlist.classList.remove('active');cardbigslider.classList.remove('active');cardsmallslider.classList.add('active');
}
