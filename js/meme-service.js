'use strict'


var gMeme = {
    imgId : 3,
    lineIndex: 0,
    lines: [
        {
            text: 'What am I doing?',
            size: 25,
            align: 'center',
            color: 'white'
        }
    ]
}

function getImgId(){
    return gMeme.imgId;
}

function getText(){
    const idx = gMeme.lineIndex;
    return gMeme.lines[idx];
}

function updateText(text){
    const idx = gMeme.lineIndex;
    gMeme.lines[idx].text = text;
}

function setNewgMeme(idx){
    gMeme = {
        imgId : idx,
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

function changeFontSize(sign){
    const lines = gMeme.lines;
    lines.forEach(line => {
        line.size += sign;
    });
    
}