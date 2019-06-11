var targetLang = "ko";
var apiKey = ""; // 요기에 키를 넣어야 동작해여

function createContextMenus() {
    selectionContextMenuId = chrome.contextMenus.create({
        title: "translation",
        contexts: ["selection"],
        onclick: sendSelectedText
    });
}

function sendSelectedText(info, tab) {
    var text = info.selectionText;
    chrome.storage.sync.get("code", function(data) {
        if (data != undefined) {
            targetLang = data.code;
        }
        var url = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey + "&q="+text+"&format=text&target=" + targetLang;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.send();  
        var result = JSON.parse(xhr.responseText);
        var resultText = result.data.translations[0].translatedText
        alert(resultText)
    })
}

function getLanguageCode() {
    chrome.storage.sync.get("code", function(data) {
        targetLang = data.code;
    });
}

chrome.runtime.onMessage.addListener(function (data) {
    if (data.msg == "updateLanguage") {
        targetLang = data.code
        console.log("message: " + data.code);
    }
})

createContextMenus();
getLanguageCode();