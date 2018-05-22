console.log("BG START");
var darkmodeDomain = false;
var tabsWithPageAction = [];
<<<<<<< HEAD
<<<<<<< HEAD
var cssToLoad = [
  "css/nitro.css",
  "css/tickets.css",
  "css/dashboards.css",
  "css/homes.css",
  "css/connect.css",
  "css/finance.css",
  "css/users.css",
  "css/aeriel-measurements.css"
];
=======
=======
>>>>>>> 5917ca19d3449c22cd0f696146f1eaa9dd84f218
var cssToLoad =
  ["nitro.css","tickets.css","dashboards.css",
  "homes.css", "connect.css", "finance.css",
  "users.css", "aeriel-measurements.css"];
<<<<<<< HEAD
=======


try {
  chrome.runtime.getPackageDirectoryEntry((DE) => {
      console.log(DE);
  });
}
catch(e){
  console.log(e);
}
>>>>>>> 5917ca19d3449c22cd0f696146f1eaa9dd84f218

>>>>>>> Selectively loads based on domain matching

try {
  chrome.runtime.getPackageDirectoryEntry(DE => {
    console.log(DE);
  });
} catch (e) {
  console.log(e);
}

try {
  chrome.runtime.getPackageDirectoryEntry(DE => {
    console.log(DE);
  });
} catch (e) {
  console.log(e);
}

chrome.storage.local.get(["darkmodeDomain"], function(response) {
  if (response.darkmodeDomain != undefined) {
    darkmodeDomain = response.darkmodeDomain;
    console.log("domain was loaded: " + darkmodeDomain);
  }
});




//called when pageAction is clicked
chrome.pageAction.onClicked.addListener(tab => {
  console.log("Saving this URL as domain to use from tab: " + tab.url);
  try {
<<<<<<< HEAD
    let parser = document.createElement("a");
=======
    let parser = document.createElement('a');
>>>>>>> 5917ca19d3449c22cd0f696146f1eaa9dd84f218
    parser.href = tab.url;
    let domain = parser.hostname;
    darkmodeDomain = domain;
    chrome.storage.local.set(
      {
        darkmodeDomain: domain
      } /*optional callback can go here*/
    );
    for (let i = 0; i < tabsWithPageAction.length; i++) {
      chrome.pageAction.hide(tabsWithPageAction[i]);
    }
  } catch (e) {
    onError(e);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("msg recieved: " + request.greeting);
  let answer = new Object();
  var response = "response: ";

<<<<<<< HEAD
  switch (request.greeting) {
    case "check css load":
      break;
=======
  switch(request.greeting) {
      case "check css load":
        checkCSSNeeded(sender);


        console.log(sender.tab.url);
<<<<<<< HEAD
=======

        break;

      case "try darkmode page action":
        console.log("trying page action");
        if(needPageAction()) {
          response += "need page action";
          chrome.pageAction.show(sender.tab.id);
          tabsWithPageAction.push(sender.tab.id);
        }
        else {
          response += "no page action needed";
        }
        break;
>>>>>>> 5917ca19d3449c22cd0f696146f1eaa9dd84f218

        break;
>>>>>>> Selectively loads based on domain matching

    case "try darkmode page action":
      console.log("trying page action");
      if (needPageAction()) {
        response += "need page action";
        chrome.pageAction.show(sender.tab.id);
        tabsWithPageAction.push(sender.tab.id);
      } else {
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
  console.log(darkmodeDomain);
  if (darkmodeDomain) {
    return false;
  }
  return true;
}

function checkCSSNeeded(sender) {
  let parser = document.createElement('a');
  parser.href = sender.tab.url;

  let newPageDomain = parser.hostname;
  console.log(newPageDomain);

  if(newPageDomain == darkmodeDomain) {
    console.log("loading CSS");
    loadCSSInTab(sender.tab);
  }
}

function loadCSSInTab(tab) {
  console.log(tab.id);
  let details = {
    "cssOrigin": "user",
    "runAt": "document_start",
    "allFrames": true,
    "file": "will be changed"
  }
  for(let i = 0; i < cssToLoad.length; i++) {
    details.file = "/css/" + cssToLoad[i];

    chrome.tabs.insertCSS(tab.id, details, function () {
        console.log("CSS Injected");
    });
  }
}

function onError(e) {
  console.log(e);
}
