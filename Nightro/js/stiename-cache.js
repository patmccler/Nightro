  /**
   * Sets the site in which you would like night mode enabled
   * Checks to see if the input is a valid URL
   *
   * @param {input} user input URL
   *
   * @return 0 if correctly stored, -1 if there was an error in the URL
   */
function setSite(input) {
  let request = new XMLHttpRequest();
  let response = 0;

  request.open("GET", input, false);
  request.send(null);

  if(request.status === 200){
    chrome.storage.local.set({URL: input}, function() {
          console.log(`Site URL stored`);
        });
  } else {
    console.log(input + " is not a valid URL");
    response = -1;
  }

  return response;

}

  /**
   * Gets the site in which you would like night mode enabled
   * Checks to see if the input is a valid URL
   *
   * @return 0 if correctly stored, -1 if there was an error in the URL
   */
function getSite() {
  var response = 'Invalid';
  try {
    chrome.storage.local.get('URL', function(data) {
      response = data['URL'];
      console.log('Fetched ')
    });
  } catch(error){
    console.log(error);
  }
  return response;
}