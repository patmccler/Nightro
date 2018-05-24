/**
 * Updates storage when a button is pressed
 * TODO: parse URL to see if it matches (regex)
 *
 * @param {input} string representing URL
 *
 * @return the string stored
 */

function updateStorage(input) {
  let response = "invalid URL";

  localStorage.setItem("inputURL", input);
  console.log("updated storage with " + input);

  return response;
}

/**
 * Checks storage for displaying URL that the user saved
 *
 * @return either the URL from storage or beginning of https
 */
function checkStorage() {
  let response = "https://";

  let storage = localStorage.inputURL;
  if (storage !== "undefined") {
    response = storage;
  }
  return response;
}

/**
 * Event listener for the pop-up html to load. Adds button event
 * listener and logic for updating the button input field
 */
window.addEventListener("DOMContentLoaded", function() {
  let submit = document.getElementById("submit");
  let fromStorage = checkStorage();

  let toggleButton = document.getElementById("toggle-button");

  try {
    document.getElementById("text-field").value = fromStorage;
  } catch (error) {
    console.log(error);
  }

  try {
    submit.addEventListener("click", function() {
      let currentField = document.getElementById("text-field").value;
      currentField = updateStorage(currentField);
      console.log(currentField);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    toggleButton.addEventListener("click", function(e) {
      toggleNightro();
    });
  } catch (error) {
    console.log(error);
  }
});

function toggleNightro() {
  // console.log("toggling");
  // // var state = checkState();
  // // state = !state;
  // console.log("state after toggle is " + state);
  // console.log(!state);
  // //toggle
  // setState(state);

  console.log("sending Toggle message");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log(tabs);
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, {
        greeting: "toggle nightro"
        //nightroState: state
      });
    }
    // catch this message in content script
  });
}

function setState(state) {
  console.log("setting state to " + state);
  localStorage.setItem("nightroState", state);
}

// //checks state of night
// function checkState() {
//   let state = localStorage.getItem("nightroState");
//   console.log("state from local is : " + state);
//   switch (state) {
//     case "true":
//       state = true;
//       break;
//     case "false":
//       state = false;
//       break;
//     default:
//       state: true;
//   }

//   console.log("returning state in check" + state);
//   return state;
// }
