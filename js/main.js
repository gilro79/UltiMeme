'use strict'


var gElCanvas;
var gIsDown = false;
var gCtx;

function init() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    // resizeCanvas()
    addListeners()
    getTextToInput();
    renderCanvas();
}



function drawImgFromlocal() {
    var img = new Image();
    const imgId = getImgId();
    img.src = `img/meme-imgs-square/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        renderText();
    }
}

function getTextToInput() {
    const inputText = document.querySelector('.meme-text');
    const idx = getLineIndex();
    const lines = getText();
    const { text } = lines[idx];
    inputText.value = text;
}

function renderCanvas() {
    // gCtx.save()
    drawImgFromlocal();
    // gCtx.restore();
}

function renderText() {
    const lines = getText();
    lines.forEach(line => {
        const { yPos, text, size, align, color } = line;
        drawText(yPos, text, size, align, color);
    });
}

function drawText(yPos, text, size, align, color) {
    const x = gElCanvas.width / 2;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = `${size}px Impact`;
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, yPos);
    gCtx.strokeText(text, x, yPos);
}

function textOnCanvas(el) {
    const text = el.value;
    updateText(text);
    renderCanvas();
}

function onChooseImg(el) {
    const imgIdx = el.dataset.name;
    setNewgMeme(imgIdx);
    renderCanvas();
    getTextToInput();
}

function onIncreaseFont() {
    const sign = 1;
    changeFontSize(sign)
    renderCanvas();
}

function onDecreaseFont() {
    const sign = -1;
    changeFontSize(sign)
    renderCanvas();
}

function onAddLine() {
    addLine();
    renderCanvas();
    getTextToInput();
}

function onSwitchLine(){
    switchLine();
    getTextToInput();
    renderCanvas();
}

function onDeleteLine(){
    deleteLine();
    getTextToInput();
    renderCanvas();
}