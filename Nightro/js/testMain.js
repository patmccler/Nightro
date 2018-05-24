console.log("test main loaded");
const NIGHTRO_STATE_KEY = "nightroState";
var sheets = [];
var defaultCSSSheets = ["nitro", "scrollbars"];

function onError(e) {
  console.log(e);
}

(function setup() {
  setupDarkMode();

  // setupPageAction();

  setupListeners();
})();

function setupListeners() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.greeting) {
      case "toggle nightro":
        //toggleNightro(request.nightroState);
        toggleNightro();
        break;
      default:
        console.log("unknown message");
    }
    sendResponse("MSG GOT");
  });

  window.addEventListener("storage", function(e) {
    console.log(e);
    if (e.key == NIGHTRO_STATE_KEY || e.key == null) {
      setupDarkMode();
    }
  });
}

//function toggleNightro(state) {
function toggleNightro() {
  //console.log("Nightro needs to be turned on: " + state);
  currentState = getStateOfToggle();
  // toggle the state
  currentState = !currentState;

  setToggleState(currentState);

  setupDarkMode();
}

function setupDarkMode() {
  if (getStateOfToggle()) {
    turnOnDarkMode();
  } else {
    removeAllCSS();
  }
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
  sheets.push(link.id);
  try {
    document.documentElement.appendChild(link);
  } catch (e) {
    onError(e);
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

// function setupPageAction() {
//   chrome.runtime.sendMessage({ greeting: "try darkmode page action" }, function(
//     response
//   ) {
//     console.log(response.response);
//   });
// }

//TODO maybe implement per - domain toggle check
//on page load, check if this domain has toggle set or not
//if not, assume we aren't interested in this page and ignore it
function getStateOfToggle() {
  let state = localStorage.getItem(NIGHTRO_STATE_KEY);
  switch (state) {
    case "true":
      state = true;
      break;
    default:
      state = false;
  }

  console.log("returning state in check" + state);
  return state;
}

//sets the state of the toggle to the one provided
function setToggleState(state) {
  if (state) {
    setToggleOn();
  } else {
    setToggleOff();
  }
}

function setToggleOn() {
  localStorage.setItem(NIGHTRO_STATE_KEY, "true");
}

function setToggleOff() {
  localStorage.removeItem(NIGHTRO_STATE_KEY);
}
