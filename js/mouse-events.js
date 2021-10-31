'use strict'
var gIsOnText = false;
var gIsDown = false;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gStartPos;
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    gIsDown = true;
    const pos = getEvPos(ev);
    var { x, y } = pos;
    const lines = getLines();
    lines.forEach((line, idx) => {
        const { yMin, yMax, xMin, xMax } = getRange(idx);
        const canvasWidth = document.querySelector('canvas').width;
        if (x > 0 && x < canvasWidth && y > yMin && y < yMax) {
            if (line.type === 'sticker') {
                if (x < xMin || x > xMax) return;
            }
            gIsOnText = true;
            document.querySelector('canvas').style.cursor = 'grabbing';
            switchFocus(idx);
            onSwitchFocus();
            const pos = getEvPos(ev);
            gStartPos = pos;
            return;
        }
    });
    gIsRendRect = false;
    renderCanvas();
}

function onMove(ev) {
    if (gIsDown && gIsOnText) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        gStartPos = pos;
        moveLine(dx, dy);
    }
}

function onUp() {
    gIsDown = false;
    gIsOnText = false;
    document.querySelector('canvas').style.cursor = 'grab';
}

function resizeCanvas() {
    const elContainer = document.querySelector('canvas')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - 30,
            y: ev.pageY - ev.target.offsetTop - 30
            // x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            // y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
