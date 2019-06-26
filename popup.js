document.addEventListener("DOMContentLoaded", function () {
    var settingsButton = document.getElementById("settingsButton");
    settingsButton.addEventListener("click", goSettings);
    var translateButton = document.getElementById("translateButton");
    translateButton.addEventListener("click", translateText);
});

function translateText() {
    var input = document.getElementById("input").value;
    chrome.runtime.sendMessage({cmd: "translate", data: input}, function(x) {
        console.warn("sendMessage fail", x);
    });    
}

function goSettings() {
	chrome.runtime.openOptionsPage();
}