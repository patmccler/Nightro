function setup() {
  restoreOptions();
  document
    .getElementById("clearDomainButton")
    .addEventListener("click", clearDomain);
}

function restoreOptions() {
  //will be used to load in values that are already Saved
}

function clearDomain() {
  chrome.storage.local.set({ darkmodeDomain: undefined });
  chrome.runtime.sendMessage({ greeting: "darkmodeDomain cleared" });
}

document.addEventListener("DOMContentLoaded", setup);
