console.log("test main loaded");

function onError(e) {
  console.log(e);
}

chrome.runtime.sendMessage({greeting:"check css load"}, function (resp) {
  //do nothing
} );
document.addEventListener("DOMContentLoaded", setup);

function setup() {
  tryWipe();
  setupPageAction();
  //TODO Send check request to BG, if need to load, load css

}

<<<<<<< HEAD
=======
function wipeAll() {
   console.log("testMain.js");
  let body = document.getElementsByTagName("body")[0];
  body.style.removeProperty("background");

  let allElem = body.getElementsByTagName("*");
  let count = 0;
  for(let i = 0; i< allElem.length; i++ ) {

    if(allElem[i] instanceof HTMLElement) {
      allElem[i].style.removeProperty("background");
      allElem[i].style.background = "inherit";
      allElem[i].style.color = "inherit";
      count++;
    }
  }
  console.log(count);
}

function tryWipe() {
  try {
    wipeAll();
  }
  catch (e)
  {
    onError(e);
  }
}
>>>>>>> 1b30493c4318cff99f9669f217d4d854609b9141

function setupPageAction() {

  chrome.runtime.sendMessage({greeting: "try darkmode page action"},
    function (response) {
      console.log(response.response);
    }
  )
}
