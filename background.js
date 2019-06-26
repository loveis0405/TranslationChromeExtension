var apiKey = "AIzaSyD2x6swAJBO4ZmHzD8BGqQoG-K4pf8A590"; // 요기에 키를 넣어야 동작해여
var targetLang = "ko";

chrome.runtime.onMessage.addListener(function (msg) {
    console.log("onMessage: " + msg.cmd);
    switch (msg.cmd) {
        case "translate":
            requestTranslate(msg.data)
            break;
        case "updateLanguage":
            targetLang = msg.data
            break;
        default:
            break;
    }
    return true;
});

selectionContextMenuId = chrome.contextMenus.create({
    title: "translation",
    contexts: ["selection"],
    onclick: sendSelectedText
});

chrome.storage.sync.get("code", function(msg) {
    if (msg.data != undefined) {
        targetLang = msg.data;
    } else {
        chrome.storage.sync.set({code: targetLang});
    }
});

function sendSelectedText(info, tab) {
    var text = info.selectionText;
    requestTranslate(text);
}

function requestTranslate(text) {
    var url = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey + "&q="+text+"&format=text&target=" + targetLang;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.send();  
    var result = JSON.parse(xhr.responseText);
    if (result.error == undefined) {
        var resultText = result.data.translations[0].translatedText
        alert(resultText)
    } else {
        alert("에러가 발생하였습니다")
    }
}