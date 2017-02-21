speakMenu();

chrome.contextMenus.onClicked.addListener(function (resp) {
    if (resp.menuItemId === 'speech') {
        speakStopMenu();

        console.log(resp.selectionText);
        responsiveVoice.speak(resp.selectionText, 'UK English Female', {onend: voiceCallback});
    }

    if (resp.menuItemId === 'speech_stop') {
        responsiveVoice.cancel();
        speakMenu();
    }

});

function voiceCallback() {
    speakMenu();
}

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

