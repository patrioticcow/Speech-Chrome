speakMenu();

var timeoutResumeInfinity;

chrome.contextMenus.onClicked.addListener(function (resp) {
    if (resp.menuItemId === 'speech') {
        speakStopMenu();
        responsiveVoice.speak(resp.selectionText);
    }

    if (resp.menuItemId === 'speech_stop') {
        responsiveVoice.cancel();
        speakMenu();
    }
});

function speakMenu() {
    chrome.contextMenus.removeAll(function () {
        chrome.contextMenus.create({
            "id"      : "speech",
            "title"   : "Speak selection",
            "contexts": ["selection"]
        });
    });
}

function speakStopMenu() {
    chrome.contextMenus.removeAll(function () {
        chrome.contextMenus.create({
            "id"      : "speech_stop",
            "title"   : "Stop Speech",
            "contexts": ["all"]
        });
    });
}

