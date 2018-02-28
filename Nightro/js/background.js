console.log("BG START");

//called when pageAction is clicked
chrome.pageAction.onClicked.addListener(() => {
  console.log("Saving this URL as domain to use");



});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("msg recieved: " + request.greeting);
  let answer = new Object();
  var response = "response: ";

  switch(request.greeting) {
      case "try darkmode page action":
        console.log("trying page action");
        response += "PAGE ACTION";
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
