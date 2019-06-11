document.addEventListener("DOMContentLoaded", function () {
    var setLangButtonKo = document.getElementById("langButtonKo");
    var setLangButtonEn = document.getElementById("langButtonEn");
    setLangButtonKo.addEventListener("click", function() {
        chrome.storage.sync.set({code: "ko"}, function() {
            updateLanguage("ko");
        })
    });
    setLangButtonEn.addEventListener("click", function() {
        chrome.storage.sync.set({code: "en"}, function() {
            updateLanguage("en");
        })
    });
    init();
});

function init() {
    chrome.storage.sync.get("code", function(data) {
        updateLanguage(data.code);
    })
}

function updateLanguage(code) {
    if (code == "ko") {
        document.getElementById("currLanguage").innerHTML = "설정: [한국어]"
    } else if (code == "en") {
        document.getElementById("currLanguage").innerHTML = "설정: [영어]"        
    }
    chrome.runtime.sendMessage({
        msg: "updateLanguage",
        code: code
    });
}