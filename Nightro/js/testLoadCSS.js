head =
  document.documentElement || document.head || document.querySelector("head");

/*
chrome.tabs.insertCSS(integer tabId, object details, function callback)

details {
  string file: /css/file.css
  cssOrigin: "user"
  allFrames: "true"
  runAt: "document_start"
}
*



function add_link_element(c_path) {
  var link = document.createElement("link"),
    href = chrome.runtime.getURL('css/' + c_path + '.css');
  link.setAttribute("type", "text/css");
  link.setAttribute("id", c_path + '-custom-css');
  link.setAttribute("class", 'dmn-custom-append-data');
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", href);
  if (head) {
    head.appendChild(link);
  }
}
/*
used for B&W mode
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
*/
