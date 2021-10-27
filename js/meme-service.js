'use strict'


var gMeme = {
    imgId: 3,
    lineIndex: 0,
    lines: [
        {
            yPos: 40,
            text: 'What am I doing?',
            size: 25,
            align: 'center',
            color: 'white'
        }
    ]
}

function addLine() {
    const yPos = (gMeme.lines.length === 1) ? 250 : 150;
    const newLine = {
        yPos,
        text: 'Hi there',
        size: 25,
        align: 'center',
        color: 'white'
    }
    gMeme.lines.push(newLine);
    gMeme.lineIndex += 1;
}

function switchLine() {
    gMeme.lineIndex += 1;
    if (gMeme.lineIndex > gMeme.lines.length - 1) gMeme.lineIndex = 0;
}

function getImgId() {
    return gMeme.imgId;
}

function getText() {
    return gMeme.lines;
}

function getLineIndex() {
    return gMeme.lineIndex;
}

function updateText(text) {
    const idx = gMeme.lineIndex;
    gMeme.lines[idx].text = text;
}

function setNewgMeme(idx) {
    gMeme = {
        imgId: idx,
        lineIndex: 0,
        lines: [
            {
                text: 'Meme me',
                size: 25,
                align: 'center',
                color: 'white'
            }
        ]
    }
}

function changeFontSize(sign) {
    const lines = gMeme.lines;
    lines.forEach(line => {
        line.size += sign;
    });

}

function deleteLine() {
    if (gMeme.lineIndex === 0) return;
    const idx = gMeme.lineIndex;
    gMeme.lines.splice(idx, 1);
    gMeme.lineIndex = 0;
}