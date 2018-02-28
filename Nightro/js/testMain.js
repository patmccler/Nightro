
function wipeAll() {
   console.log("testMain.js");
  let body = document.querySelector("body");
  body.style.removeProperty("background");

  let allElem = document.getElementsByTagName("*");

  for(let i = 0; i< allElem.length; i++ ) {

    if(allElem[i] instanceof HTMLElement && allElem[i] != body) {
      allElem[i].style.removeProperty("background");
      allElem[i].style.background = "inherit";
      allElem[i].style.color = "white";
    }


  }

}

setTimeout(wipeAll, 1000);//runs on page load
