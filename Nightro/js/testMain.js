console.log("test main loaded");

function onError(e) {
  console.log(e);
}

document.addEventListener("DOMContentLoaded", setup);

function setup() {
  chrome.runtime.sendMessage({ greeting: "check css load" }, function(resp) {
    //do nothing
  });

  // chrome.storage.local.get(["darkmodeDomain"], function(response) {
  //   let domain = false;
  //   if (response.darkmodeDomain != undefined) {
  //     domain = response.darkmodeDomain;
  //     if (domain) {
  //       let needsDarkMode = currentDomainNeedsDarkMode(domain);
  //       console.log(needsDarkMode);
  //       if (needsDarkMode) {
  //         turnOnDarkMode();
  //       }
  //     }
  //   }
  // });
  setupPageAction();
}

function turnOnDarkMode() {
  //TODO
  // console.log("turning on dark mode !");
  // chrome.runtime.sendMessage({ greeting: "turn on darkmode" });
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
