console.log("test main loaded");
//key used to set toggle state in local storage
const NIGHTRO_STATE_KEY = "nightroState";
//id of sheets that have been added to the page
var sheets = [];
//sheets to load in every page
var defaultCSSSheets = ["nitro", "scrollbars"];

function onError(e) {
  console.log(e);
}

/**
 * initial setup when page loaded
 * turns darkmode on or off if needed
 * sets listeners to local storage as well
 */
(function setup() {
  setupDarkMode();

  setupListeners();
})();

/**
 * Listens for messages
 * Currently just messages from Popup to toggle state of nightro
 */
function setupListeners() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.greeting) {
      case "toggle nightro":
        toggleNightro();
        break;
      default:
        console.log("unknown message");
    }
    sendResponse("MSG GOT");
  });

  /**
   * Listens for changes to local storage,
   * needs to change state of nightro if correct key is changed
   */
  window.addEventListener("storage", function(e) {
    if (e.key == NIGHTRO_STATE_KEY || e.key == null) {
      setupDarkMode();
    }
  });
}

/**
 * Toggles the state of nightro
 * Finds out what the current state is
 * Changes it, changes the current page and the local storage
 * Other pages listen for local storage and change when that does
 */
function toggleNightro() {
  //console.log("Nightro needs to be turned on: " + state);
  currentState = getStateOfToggle();
  // toggle the state
  currentState = !currentState;

  setToggleState(currentState);

  setupDarkMode();
}

/**
 * Checks the state of darkmode,
 * and then turns it on or off accordingly
 */
function setupDarkMode() {
  if (getStateOfToggle()) {
    turnOnDarkMode();
  } else {
    removeAllCSS();
  }
}

/**
 * Turns Nightro on
 * loads default files from "defaultCSSSheets" defined above
 * then, loads files based on URL Path
 * if path is .com/files/1321321/edit
 * loads css files "files.css" and "files-edit"
 * inserts a - for /, and skips numbers
 *
 */
function turnOnDarkMode() {
  console.log("loading default files");
  var fileToLoad;
  //tries to loads all the default files
  for (var i = 0; i < defaultCSSSheets.length; i++) {
    fileToLoad = defaultCSSSheets[i];
    loadCSS(fileToLoad);
  }

  //gets the pieces of the path
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

/**
 * Loads the file at css/<file>.css,
 * from base of extension folder
 * Files that are added are collected in sheets variable,
 * so they can be removed later
 * @param {string} file
 */
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
    //appends to doc, avoids issue with head not being loaded yet
    document.documentElement.appendChild(link);
  } catch (e) {
    onError(e);
  }
}

/**
 * removes all the css that this script had loaded
 */
function removeAllCSS() {
  for (var i = 0; i < sheets.length; i++) {
    thisSheet = document.getElementById(sheets[i]);

    thisSheet && thisSheet.parentNode.removeChild(thisSheet);
  }
  sheets = [];
}

/**
 * checks the current state of the toggle
 * returns true if toggle is on (Nightro should be displaying)
 * returns false otherwise (unset or false)
 */
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

/**
 * Sets the state of the Nitro toggle in local storage
 * @param {boolean} state
 */
function setToggleState(state) {
  if (state) {
    setToggleOn();
  } else {
    setToggleOff();
  }
}

/**
 * Sets the Nightro Toggle to on
 */
function setToggleOn() {
  localStorage.setItem(NIGHTRO_STATE_KEY, "true");
}

/**
 * Removes the toggle from local storage
 * will return false if checking for state
 */
function setToggleOff() {
  localStorage.removeItem(NIGHTRO_STATE_KEY);
}
