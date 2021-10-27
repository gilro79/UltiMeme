'use strict'


var gElCanvas;
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
        // if(gIsOnText && gIsDown) 
        renderRect();
        renderText();
    }
}

function getTextToInput() {
    const inputText = document.querySelector('.meme-text');
    const idx = getLineIndex();
    const lines = getLines();
    const { text } = lines[idx];
    inputText.value = text;
}

function renderCanvas() {
    // gCtx.save()
    drawImgFromlocal();
    // gCtx.restore();
}

function renderText() {
    const lines = getLines();
    lines.forEach(line => {
        const { xPos, yPos, text, size, align, color } = line;
        drawText( xPos,yPos, text, size, align, color);
    });
}

function renderRect() {
    const idx = getLineIndex();
    const line = getLines()[idx];
    const x = 5;
    let {size , yPos} = line;
    const y = yPos - size;
    const xEnd = gElCanvas.width - 10;
    const yEnd = size + 7;

    gCtx.beginPath();
    gCtx.rect(x, y, xEnd, yEnd);
    gCtx.globalAlpha = 0.3;
    gCtx.fillStyle = 'white';
    gCtx.fillRect(x, y, xEnd, yEnd);
    gCtx.globalAlpha = 1;
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'grey';
    gCtx.stroke();
}

function drawText( xPos,yPos, text, size, align, color) {
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = `${size}px Impact`;
    gCtx.textAlign = align;
    const textMeasure = gCtx.measureText(text);
    // console.log('textMeasure.width', textMeasure.width);
    gCtx.fillText(text, xPos, yPos);
    gCtx.strokeText(text, xPos, yPos);
}


function textOnCanvas(el) {
    const text = el.value;
    updateText(text);
    renderCanvas();
}

function onChooseImg(el) {
    const imgIdx = el.dataset.name;
    setNewgMeme(imgIdx);
    getTextToInput();
    renderCanvas();
}

function onMoveLine(){
    renderCanvas();
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

function onSwitchLine() {
    switchLine();
    getTextToInput();
    renderCanvas();
}

function onDeleteLine() {
    deleteLine();
    getTextToInput();
    renderCanvas();
}

function onSwitchFocus(){
    getTextToInput();
    renderCanvas();
}