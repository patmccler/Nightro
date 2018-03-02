function updateCache(input){
  chrome.storage.local.set({'inputURL': input}, function() {
        console.log(`Site URL stored`);
  });
  return input;
}

function checkCache(){
  let response = 'https://'
  chrome.storage.local.get('inputURL', function(items){
    try { 
      console.log(items.inputURL);
      response = items.inputURL;
      return response;
    } catch(error) {
      console.log('error in cache lookup')
    }
  });
  return response;
}

window.addEventListener('DOMContentLoaded', function(){

  let submit = document.getElementById('submit');
  let fromCache = checkCache();

  try {
    document.getElementById('text-field').value = fromCache;
  } catch(error){
    console.log(error);
  }

  try{
    submit.addEventListener("click", function(){
      let currentField = document.getElementById('text-field');
      if(currentField != fromCache){
        currentField = updateCache(currentField);
      }
    });
  } catch(error){
    console.log(error);
  }

});