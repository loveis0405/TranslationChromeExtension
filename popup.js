document.addEventListener("DOMContentLoaded", function () {
    var settingsButton = document.getElementById("settingsButton");
    settingsButton.addEventListener("click", goSettings);
});

function goSettings() {
	chrome.runtime.openOptionsPage();
}