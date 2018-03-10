console.log("test main loaded");

function onError(e) {
  console.log(e);
}

document.addEventListener("DOMContentLoaded", setup);

function setup() {
  setupPageAction();
  //TODO Send check request to BG, if need to load, load css

}


function setupPageAction() {

  chrome.runtime.sendMessage({greeting: "try darkmode page action"},
    function (response) {
      console.log(response.response);
    }
  )
}
