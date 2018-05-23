console.log("test main loaded");

var darkmodeSliderOn;

function onError(e) {
  console.log(e);
}

(function setup() {
  darkmodeSliderOn = true;
  setupDarkMode();

  // works to load always. need to redo to check in content script
  // going to check in content script instead
  // chrome.runtime.sendMessage({ greeting: "check css load" }, function(resp) {
  //   //do nothing
  // });

  setupPageAction();
})();

function setupDarkMode() {
  if (!darkmodeSliderOn) {
    // TODO maybe need to disable here?
    return;
  }

  //gets domain from local storage, and calls turnOnDarkMode if needed
  chrome.storage.local.get(["darkmodeDomain"], function(response) {
    let domain = false;
    if (response.darkmodeDomain != undefined) {
      domain = response.darkmodeDomain;
      if (domain) {
        let needsDarkMode = currentDomainNeedsDarkMode(domain);
        console.log(needsDarkMode);
        if (needsDarkMode) {
          turnOnDarkMode();
        }
      }
    }
  });
}

function turnOnDarkMode() {
  console.log("loading default file");
  var fileToLoad = "nitro";
  loadCSS(fileToLoad);

  let pathPieces = location.pathname.split("/");

  console.log(pathPieces);

  fileToLoad = "";
  //for each piece of the path
  for (var i = 1; i < pathPieces.length; i++) {
    //if true, path piece is a number and needs to be skipped
    if (parseInt(pathPieces[i])) {
      console.log(pathPieces[i] + "is a number or blank");
    } else {
      if (fileToLoad == "") {
        fileToLoad = pathPieces[i];
      } else {
        fileToLoad = fileToLoad + "-" + pathPieces[i];
      }
    }

    try {
      console.log(fileToLoad);
      //loadCSS();
    } catch (e) {
      onError(e);
    }
  }
}

// adds "css/<file>.css"
function loadCSS(file) {
  var link = document.createElement("link");
  link.href = chrome.extension.getURL("css/" + file + ".css");
  link.id = file;
  console.log("try to load " + file);

  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

function unloadCSS(file) {
  var cssNode = document.getElementById(file);
  cssNode && cssNode.parentNode.removeChild(cssNode);
}

function currentDomainNeedsDarkMode(darkModeDomain) {
  let currDomain = window.location.hostname;
  console.log(currDomain);

  return darkModeDomain == currDomain;
}

function wipeAll() {
  console.log("wipeall - should be unused");
  let body = document.getElementsByTagName("body")[0];
  body.style.removeProperty("background");

  let allElem = body.getElementsByTagName("*");
  let count = 0;
  for (let i = 0; i < allElem.length; i++) {
    if (allElem[i] instanceof HTMLElement) {
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
  } catch (e) {
    onError(e);
  }
}

function setupPageAction() {
  chrome.runtime.sendMessage({ greeting: "try darkmode page action" }, function(
    response
  ) {
    console.log(response.response);
  });
}
