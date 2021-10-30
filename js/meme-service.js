'use strict'
var gImgs = [];
var gFilterSearchBy;
var gKeyWordsClicks = {};
var gImgQty = 18;
var gMemeSaved = [];
var gKeyWords = ['happy', 'ironic', 'sad', 'dramatic', 'angry', 'beautiful', 'annoying', 'bad']
var gMeme = {
    imgId: 3,
    lineIndex: 0,
    lines: [createLine()]

};

// setting the first imgs on init
function setGImgs() {
    for (let i = 0; i < gImgQty; i++) {
        var img = {};
        img.id = i + 1;
        img.url = `img/meme-imgs-square/${i + 1}.jpg`;
        img.keywords = getRandKeyWords();
        gImgs.push(img);
    }
}

function getImgs() {
    var imgs = gImgs;

    if (gFilterSearchBy) {
        imgs = gImgs.filter(function (img) {
            return img.keywords.join().includes(gFilterSearchBy)
        })
    }
    return imgs;
}

function getSavedMemes(){
    return gMemeSaved
}

function getRandKeyWords() {
    var keyWords = [];
    for (let i = 0; i < 2; i++) {
        let keyWord = gKeyWords[getRandomInt(0, 8)]
        keyWords.push(keyWord);
    }
    return keyWords;
}

function getClickNumber(keyWord) {
    gKeyWordsClicks[keyWord] = (gKeyWordsClicks[keyWord]) ? gKeyWordsClicks[keyWord] + 1 : 1;
    return gKeyWordsClicks[keyWord];
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
        color: 'white',
        type: 'text',
        stickerId : 'not-sticker'
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

function addSticker(stickerId) {
    const newLine = createLine();
    newLine.xPos = gElCanvas.width / 2;
    newLine.yPos = gElCanvas.height / 2;
    newLine.text = '';
    newLine.type = 'sticker'
    newLine.stickerId = stickerId;
    gMeme.lines.push(newLine);
    gMeme.lineIndex += 1;
}

function switchLine() {
    gMeme.lineIndex += 1;
    if (gMeme.lineIndex > gMeme.lines.length - 1) gMeme.lineIndex = 0;
}

function getRange(idx) {
    const xPos = gMeme.lines[idx].xPos;
    const yPos = gMeme.lines[idx].yPos;
    const type = gMeme.lines[idx].type;
    if(type === 'text'){
        const size = gMeme.lines[idx].size;
        const yMin = yPos - size;
        const yMax = yPos + 7;
        return { yMin, yMax }
    }else{
        const yMin = yPos - 25;
        const yMax = yPos + 30;
        const xMin = xPos - 25;
        const xMax = xPos + 25;
        return { yMin, yMax , xMin, xMax }
    }
}

function getImgId() {
    return gMeme.imgId;
}

function getLines() {
    return gMeme.lines;
}

function getLine(){
    return gMeme.lines[gMeme.lineIndex];
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
    gMeme.lineIndex -= 1;
}

function filterImgs(searchText) {
    gFilterSearchBy = searchText;
}
// saveImgToMeme();
function saveImgToMeme(imgUrl){
    var res = imgUrl.indexOf('id=') + 3;
    var textLink = 'http://ca-upload.com/here/img/' + imgUrl.slice(res) + '.jpg';
    gMemeSaved.push(textLink);
}