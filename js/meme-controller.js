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
    renderGallery();
}

function drawImgFromlocal() {
    var img = new Image();
    const meme = getgMeme();
    const imgId = meme.imgId;
    if (imgId) {
        img.src = `img/meme-imgs-various-aspect-ratios/${imgId}.jpg`;
    } else {
        console.log('from upload');
        img.src = meme.dataUrl;
    }
    const line = getLine();
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
    var strHtmls = imgs.map(img => {
        return `<img onclick="onChooseImg(this)" data-name="${img.id}" class="pic img-${img.id}" src="${img.url}" title="${img.keywords}">`
    })
    document.querySelector('.main-gallery').innerHTML = strHtmls.join('');
}

function renderMemes() {
    var savedMemes = getSavedMemes();
    var strHtmls = savedMemes.map(meme => `<img src="${meme}">`)
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
    drawImgFromlocal();
}

function renderText() {
    const lines = getLines();
    lines.forEach(line => {
        const { xPos, yPos, text, size, align, color, type } = line;
        if (type === 'sticker') {
            renderSticker(line);
        } else {
            drawText(xPos, yPos, text, size, align, color);
        }
    });
}

function renderSticker(line) {
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
    document.querySelector('.main-wrapper').hidden = true;
    document.querySelector('.search-gallery').hidden = false;
    document.querySelector('.memes-wrapper').hidden = true;
    document.querySelector('.gallery-li').classList.add('selected');
    document.querySelector('.memes-li').classList.remove('selected');
    document.querySelector('.gallery-a').style.color = 'black';
    document.querySelector('.memes-a').style.color = 'white';
    document.body.classList.remove('menu-open');
    renderGallery();
}

function onGoToMemes() {
    document.querySelector('.main-wrapper').hidden = true;
    document.querySelector('.search-gallery').hidden = true;
    document.querySelector('.memes-wrapper').hidden = false;
    document.querySelector('.gallery-li').classList.remove('selected');
    document.querySelector('.memes-li').classList.add('selected');
    document.querySelector('.gallery-a').style.color = 'white';
    document.querySelector('.memes-a').style.color = 'black';
    document.body.classList.remove('menu-open');
    renderMemes();
}

function goToMemeEditor() {
    document.querySelector('.main-wrapper').hidden = false;
    document.querySelector('.search-gallery').hidden = true;
    document.querySelector('.memes-wrapper').hidden = true;
    document.querySelector('.gallery-li').classList.remove('selected');
    document.querySelector('.memes-li').classList.remove('selected');
    document.querySelector('.gallery-a').style.color = 'white';

}

function onMoveLine() {
    renderCanvas();
}

function onChangeFontSize(sign) {
    changeFontSize(sign)
    renderCanvas();
}
function onAddLine() {
    addLine();
    renderCanvas();
    getTextToInput();
}

function onTextAlign(align) {
    setXposAlign(align);
    renderCanvas();
}

function onAddSticker(el) {
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
    let el = document.querySelector('.more-words-wrapper').hidden;
    el = !el;
    document.querySelector('.more-words-wrapper').hidden = el;
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
    document.querySelector('.share-modal-wrapper').hidden = true;
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}
// var gImgTest;
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image();
        goToMemeEditor();
        img.onload = onImageReady.bind(null, img);
        img.src = event.target.result;
        gImgTest = img;
        setgMemeFromUpload(img.src);
        // const imgWidth = img.width;
        // console.log('imgSrc',img.src);
        // console.log('gImgTest.width',gImgTest.width);
        // console.log('imgWidth',imgWidth);
    }
    reader.readAsDataURL(ev.target.files[0])
}