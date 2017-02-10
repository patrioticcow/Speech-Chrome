speakMenu();

var timeoutResumeInfinity;

chrome.contextMenus.onClicked.addListener(function (resp) {
    if (resp.menuItemId === 'speech') {
        // add the stop menu
        speakStopMenu();

        var utterance;

        var sentences = resp.selectionText.split(". ");
        for (var i = 0; i < sentences.length; i++) {
            var sentence = sentences[i];
            utterance = new SpeechSynthesisUtterance(sentence);
            speechSynthesis.speak(utterance);

            resumeInfinity();
        }

        utterance.onstart = function (event) {
            resumeInfinity();
        };

        utterance.onend = function (event) {
            //speakMenu();
            clearTimeout(timeoutResumeInfinity);
        };

    }

    // if stop menu is clicked
    if (resp.menuItemId === 'speech_stop') {
        speechSynthesis.cancel();
        speakMenu();
    }
});

function resumeInfinity() {
    speechSynthesis.resume();
    timeoutResumeInfinity = setTimeout(resumeInfinity, 1000);
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
