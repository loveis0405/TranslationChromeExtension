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
    var targetLang = "ko";
    chrome.storage.sync.get("code", function(data) {
        if (data.code != undefined) {
            targetLang = data.code;
        }
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