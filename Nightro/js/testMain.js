console.log("test main loaded");

var darkmodeSliderOn;
var defaultCSSSheets = ["nitro", "scrollbar"];

function onError(e) {
  console.log(e);
}

(function setup() {
  darkmodeSliderOn = true;
  setupDarkMode();

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
  console.log("loading default files");
  var fileToLoad = "nitro";
  //tries to loads all the default files
  for (var i = 0; i < defaultCSSSheets.length; i++) {
    fileToLoad = defaultCSSSheets[i];
    loadCSS(fileToLoad);
  }

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

      try {
        console.log(fileToLoad);
        loadCSS(fileToLoad);
      } catch (e) {
        onError(e);
      }
    }
  }
}

// adds "css/<file>.css"
function loadCSS(file) {
  var link = document.createElement("link");
  link.href = chrome.extension.getURL("css/" + file + ".css");
  link.id = file;
  link.classList.add("nightro-sheet");
  console.log("try to load " + file);

  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

function removeAllCSS() {
  var sheets = document.getElementsByClassName("nightro-sheet");

  for (var i = 0; i < sheets.length; i++) {
    thisSheet = sheets[i];
    thisSheet.parentElement.removeChild(thisSheet);
  }
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
