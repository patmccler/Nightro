console.log("BG START");
var darkmodeDomain = false;
var tabsWithPageAction = [];

chrome.storage.local.get(["darkmodeDomain"],
  function(response) {
    if(response.darkmodeDomain != undefined) {
      darkmodeDomain = response.darkmodeDomain;
      console.log("domain was loaded: " + darkmodeDomain);
    }
  }
);

//called when pageAction is clicked
chrome.pageAction.onClicked.addListener((tab) => {
  console.log("Saving this URL as domain to use from tab: " + tab.url);
  try {
    let domain = /https?:\/\/(?:www.)?\S{1,30}.com\/|file:\/\/\/\S*.html/i.exec(tab.url)[0];
    darkmodeDomain = domain;
    chrome.storage.local.set({
      darkmodeDomain: domain
      }/*optional callback can go here*/
    );
  }
  catch (e) {
    onError(e);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("msg recieved: " + request.greeting);
  let answer = new Object();
  var response = "response: ";

  switch(request.greeting) {
      case "try darkmode page action":
        console.log("trying page action");
        if(needPageAction()) {
          response += "need page action";
          chrome.pageAction.show(sender.tab.id);
          tabsWithPageAction.push(tab.id);
        }
        else {
          response += "no page action needed";
        }
        break;

      case "darkmodeDomain cleared":
        darkmodeDomain = false;
        response += "clear domain recieved";
        break;

      default:
        response += "unknown message";
        console.log("unknown message: " + request.greeting);
      break;
  }

  console.log("sending response: " + response);
  answer["response"] = response;
  sendResponse(answer);

});

function needPageAction() {

  if(darkmodeDomain)
    return true;
  return false;
}

function onError(e) {
  console.log(e);
}
