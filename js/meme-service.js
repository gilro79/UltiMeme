'use strict'


var gMeme = {
    imgId: 3,
    lineIndex: 0,
    lines: [createLine()]

}

function setNewgMeme(idx) {
    gMeme = {
        imgId: idx,
        lineIndex: 0,
        lines: [createLine()]
    }
}

function createLine() {
    gElCanvas = document.querySelector('canvas');
    var line =
    {
        xPos: gElCanvas.width / 2,
        yPos: 40,
        text: 'What am I doing?',
        size: 25,
        align: 'center',
        color: 'white'
    }
    return line;
}

function moveLine(dx, dy) {
    const idx = gMeme.lineIndex;
    const line = gMeme.lines[idx];
    line.xPos += dx;
    line.yPos += dy;
    onMoveLine();
}

function addLine() {
    const newLine = createLine();
    newLine.yPos = (gMeme.lines.length === 1) ? 250 : 150;
    gMeme.lines.push(newLine);
    gMeme.lineIndex += 1;
}

function switchLine() {
    gMeme.lineIndex += 1;
    if (gMeme.lineIndex > gMeme.lines.length - 1) gMeme.lineIndex = 0;
}

function getYRange(idx) {
    const yPos = gMeme.lines[idx].yPos;
    const size = gMeme.lines[idx].size;
    const yMin = yPos - size;
    const yMax = yPos + 7;
    return { yMin, yMax }
}

function getImgId() {
    return gMeme.imgId;
}

function getLines() {
    return gMeme.lines;
}

function getLineIndex() {
    return gMeme.lineIndex;
}

function updateText(text) {
    const idx = gMeme.lineIndex;
    gMeme.lines[idx].text = text;
}

function switchFocus(idx) {
    gMeme.lineIndex = idx;
    onSwitchFocus();
}

function changeFontSize(sign) {
    const line = gMeme.lines[gMeme.lineIndex];
    line.size += sign;

}

function deleteLine() {
    if (gMeme.lineIndex === 0) return;
    const idx = gMeme.lineIndex;
    gMeme.lines.splice(idx, 1);
    gMeme.lineIndex = 0;
}