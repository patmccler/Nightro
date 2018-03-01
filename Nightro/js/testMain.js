console.log("test main loaded");

function onError(e) {
  console.log(e);
}

document.addEventListener("DOMContentLoaded", testSetup);

function testSetup() {
  try {
    setup();
  }
  catch(e) {
    onError(e);
  }
}


function setup() {
  chrome.storage.local.get(["darkmodeDomain"],
    function (response) {
      let domain = false;
      if(response.darkmodeDomain != undefined) {
          domain = response.darkmodeDomain;
      }

      console.log(domain);
    }
  );
  setupPageAction();
  //TODO Send check request to BG, if need to load, load css


}

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

function setupPageAction() {

  chrome.runtime.sendMessage({greeting: "try darkmode page action"},
    function (response) {
      console.log(response.response);
    }
  )
}
