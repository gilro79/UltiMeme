'use strict'


var gCanvas;
var gCtx;

function init() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');

    renderCanvas();
}

function drawImgFromlocal() {
    var img = new Image();
    const imgId = getImgId();
    img.src = `meme-imgs-square/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        renderText();
    }
}

function renderCanvas() {
    gCtx.save()
    drawImgFromlocal();
    gCtx.restore();
}

function renderText() {
    const lines = getText();
    const { text, size, align, color } = lines[0];
    drawText(text, size, align, color);
}

function drawText(text, size, align, color) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = `${size}px Impact`;
    gCtx.fillText(text, 40, 40);
    gCtx.strokeText(text, 40, 40);
}