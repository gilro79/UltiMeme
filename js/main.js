'use strict'


var gElCanvas;
var gCtx;
var gIsRendRect = true;
var gElLink;

function init() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    setGImgs();
    // resizeCanvas()
    addListeners()
    // getTextToInput();
    // renderCanvas();
    renderGallery();
}

function drawImgFromlocal() {
    var img = new Image();
    const imgId = getImgId();
    const line = getLine();
    img.src = `img/meme-imgs-various-aspect-ratios/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        if (gIsRendRect) {
            renderRect();
        }
        renderText();
        gIsRendRect = true;
    }
}

function renderGallery() {
    var imgs = getImgs();
    var strHtmls = imgs.map(function (img) {
        return `<img onclick="onChooseImg(this)" data-name="${img.id}" class="pic img-${img.id}" src="${img.url}" title="${img.keywords}">`
    })
    document.querySelector('.main-gallery').innerHTML = strHtmls.join('');
}

function renderMemes() {
    var savedMemes = getSavedMemes();
    var strHtmls = savedMemes.map(function (meme) {
        return `<img src="${meme}">`
    })
    document.querySelector('.memes').innerHTML = strHtmls.join('');
}

function getTextToInput() {
    const inputText = document.querySelector('.meme-text');
    const idx = getLineIndex();
    const lines = getLines();
    const { text } = lines[idx];
    inputText.value = text;
}

function setCanvasHeight(width, height) {
    const ratio = width / height;
    gElCanvas.height = 270 / ratio;

}

function renderCanvas() {
    // gCtx.save()
    drawImgFromlocal();
    // gCtx.restore();
}

function renderText() {
    const lines = getLines();
    lines.forEach(line => {
        // debugger;
        const { xPos, yPos, text, size, align, color, type } = line;
        if (type === 'sticker') {
            renderSticker(line);
        } else {
            drawText(xPos, yPos, text, size, align, color);
        }
    });
}

function renderSticker(line) {
    // const line = getLine();
    const { xPos, yPos, text, size, align, color, type } = line;
    gCtx.beginPath();
    const elImg = document.querySelector(`.${line.stickerId}`);
    gCtx.drawImage(elImg, xPos - 25, yPos - 25, 50, 50)
}

function renderRect() {
    const line = getLine();
    if (line.type === 'text') {
        var x = 5;
        let { size, yPos } = line;
        var y = yPos - size;
        var xEnd = gElCanvas.width - 10;
        var yEnd = size + 7;
    } else {
        var x = line.xPos - 30;
        var y = line.yPos - 30;
        var xEnd = 60;
        var yEnd = 60;
    }

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

function drawText(xPos, yPos, text, size, align, color) {
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
    setCanvasHeight(el.width, el.height);
    goToMemeEditor();
    const imgIdx = el.dataset.name;
    setNewgMeme(imgIdx);
    getTextToInput();
    renderCanvas();
}

function onGoToGallery() {
    document.querySelector('.main-rapper').hidden = true;
    document.querySelector('.search-gallery').hidden = false;
    document.querySelector('.memes-rapper').hidden = true;
    document.querySelector('.gallery-li').classList.add('selected');
    document.querySelector('.memes-li').classList.remove('selected');
    document.querySelector('.gallery-a').style.color = 'black';
    document.querySelector('.memes-a').style.color = 'white';
    document.body.classList.remove('menu-open');
    renderGallery();
}

function onGoToMemes() {
    document.querySelector('.main-rapper').hidden = true;
    document.querySelector('.search-gallery').hidden = true;
    document.querySelector('.memes-rapper').hidden = false;
    document.querySelector('.gallery-li').classList.remove('selected');
    document.querySelector('.memes-li').classList.add('selected');
    document.querySelector('.gallery-a').style.color = 'white';
    document.querySelector('.memes-a').style.color = 'black';
    document.body.classList.remove('menu-open');
    renderMemes();
}

function goToMemeEditor() {
    document.querySelector('.main-rapper').hidden = false;
    document.querySelector('.search-gallery').hidden = true;
    document.querySelector('.memes-rapper').hidden = true;
    document.querySelector('.gallery-li').classList.remove('selected');
    document.querySelector('.memes-li').classList.remove('selected');
    document.querySelector('.gallery-a').style.color = 'white';

}

function onMoveLine() {
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

function onCenterAlign() {
    setXposalign('center')

    renderCanvas();
}

function onLeftAlign() {
    setXposalign('left')

    renderCanvas();
}

function onRightAlign() {
    setXposalign('right')

    renderCanvas();
}

function onAddSticker(el) {
    // console.log(el.classList[0]);
    const stickerId = el.classList[0];
    addSticker(stickerId);
    renderCanvas();
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

function onSwitchFocus() {
    getTextToInput();
    renderCanvas();
}

function onSearchImg() {
    var elSearch = document.querySelector('.img-search');
    const searchText = elSearch.value;
    filterImgs(searchText);
    renderGallery();
}

function onSearchClear() {
    setTimeout(() => {
        onSearchImg();
    }, 10);
}

function searchThis(el) {
    const searchWord = el.innerText;
    const searchInput = document.querySelector('.img-search');
    searchInput.value = searchWord;
    onSearchImg();
    searchWordFontInc(el);
}

function searchWordFontInc(el) {
    const initialFontSize = 12;
    const keyWord = el.innerText;
    const clickNumber = getClickNumber(keyWord);
    let fontSize = initialFontSize + clickNumber + 'px';
    if (fontSize > '40px') return;
    el.style.fontSize = fontSize;
}

function toggleMoreSearchWords() {
    let el = document.querySelector('.more-words-rapper').hidden;
    el = !el;
    document.querySelector('.more-words-rapper').hidden = el;
    if (el) {
        document.querySelector('.more-li').innerText = 'more'
    } else {
        document.querySelector('.more-li').innerText = 'less'
    }
}

function onDownload(elLink) {
    gIsRendRect = false;
    gElLink = elLink;
    renderCanvas();
    var imgContent = gElCanvas.toDataURL('image/jpeg');
    gElLink.href = imgContent;
}

function closeModal() {
    document.querySelector('.share-modal-rapper').hidden = true;
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        goToMemeEditor();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}