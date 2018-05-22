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

  try {
    document.getElementById("text-field").value = fromStorage;
  } catch (error) {
    console.log(error);
  }

  try {
    submit.addEventListener("click", function() {
      let currentField = document.getElementById("text-field").value;
      currentField = updateStorage(currentField);
    });
  } catch (error) {
    console.log(error);
  }
});
