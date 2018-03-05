head = document.documentElement || document.head || document.querySelector("head");


<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fixed addon name in manifest.
/*
chrome.tabs.insertCSS(integer tabId, object details, function callback)

details {
  string file: /css/file.css
  cssOrigin: "user"
  allFrames: "true"
  runAt: "document_start"
}
*
<<<<<<< HEAD
=======



>>>>>>> pulling master before continuing
=======
>>>>>>> fixed addon name in manifest.



function add_link_element(c_path) {
  var link = document.createElement("link"),
    href = chrome.runtime.getURL('css/' + c_path + '.css');
  link.setAttribute("type", "text/css");
  link.setAttribute("id", c_path + '-custom-css');
  link.setAttribute("class", 'dmn-custom-append-data');
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", href);
  if (head) {
    head.appendChild(link);
  }
}
