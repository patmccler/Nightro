head = document.documentElement || document.head || document.querySelector("head");








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