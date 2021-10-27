'use strict'


var gCanvas;
var gCtx;

function init() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    getTextToInput();
    renderCanvas();
}

function drawImgFromlocal() {
    var img = new Image();
    const imgId = getImgId();
    img.src = `img/meme-imgs-square/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        renderText();
    }
}

function getTextToInput(){
    const inputText = document.querySelector('.meme-text');
    const {text} = getText();
    inputText.value = text;
}

function renderCanvas() {
    // gCtx.save()
    drawImgFromlocal();
    // gCtx.restore();
}

function renderText() {
    const line = getText();
    const { text, size, align, color } = line;
    drawText(text, size, align, color);
}

function drawText(text, size, align, color) {
    const x = gCanvas.width / 2;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = `${size}px Impact`;
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, 40);
    gCtx.strokeText(text, x, 40);
}

function textOnCanvas(el){
    const text = el.value;
    updateText(text);
    renderCanvas();
}

function onChooseImg(el){
    const imgIdx = el.dataset.name;
    setNewgMeme(imgIdx);
    renderCanvas();
    getTextToInput();
}

function onIncreaseFont(){
    const sign = 1;
    changeFontSize(sign)
    renderCanvas();
}

function onDecreaseFont(){
    const sign = -1;
    changeFontSize(sign)
    renderCanvas();
}