console.log("test main loaded");

var darkmodeSliderOn;
var sheets = [];
var defaultCSSSheets = ["nitro", "scrollbars"];

function onError(e) {
  console.log(e);
}

(function setup() {
  darkmodeSliderOn = true;
  setupDarkMode();

  setupPageAction();

  setupListeners();
})();

function setupListeners() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.greeting) {
      case "toggle nightro":
        toggleNightro(request.nightroState);
        break;
      default:
        console.log("unknown message");
    }
    sendResponse("MSG GOT");
  });
}

function toggleNightro(state) {
  console.log("Nightro needs to be turned on: " + state);
  if (state) {
    turnOnDarkMode();
  } else {
    //needs to be turned off
    removeAllCSS();
  }
}

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
  var fileToLoad;
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
  link.id = "nightro-" + file;
  link.classList.add("nightro-sheet");
  console.log("try to load " + file);

  link.type = "text/css";
  link.rel = "stylesheet";
  if (!document.getElementById(link.id)) {
    sheets.push(link.id);
    document.getElementsByTagName("head")[0].appendChild(link);
  }
}

function removeAllCSS() {
  for (var i = 0; i < sheets.length; i++) {
    thisSheet = document.getElementById(sheets[i]);

    thisSheet && thisSheet.parentNode.removeChild(thisSheet);
  }
  sheets = [];
  // var sheets = document.getElementsByClassName("nightro-sheet");
  // console.log(sheets);
  // thisSheet = "";
  // for (let i = 0; i < sheets.length; i++) {
  //   thisSheet = sheets[i];
  //     console.log("removing ");
  //     console.log(thisSheet);

  //   thisSheet && thisSheet.parentNode.removeChild(thisSheet);
  //     //document.getElementsByTagName("head")[0].removeChild(thisSheet);
  //   }
  // }
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

function setupPageAction() {
  chrome.runtime.sendMessage({ greeting: "try darkmode page action" }, function(
    response
  ) {
    console.log(response.response);
  });
}
