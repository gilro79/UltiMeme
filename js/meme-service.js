'use strict'


var gMeme = {
    imgId : 3,
    lineIndex: 0,
    lines: [
        {
            text: 'What am I doing?',
            size: 30,
            align: 'center',
            color: 'red'
        }
    ]
}

function getImgId(){
    return gMeme.imgId;
}

function getText(){
    return gMeme.lines;
}