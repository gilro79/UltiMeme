'use strict'

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

}
function onMove(ev) {
    if (gIsDown) {
        var { offsetX, offsetY, movementX, movementY } = ev;
        if (!offsetX) {
            var { pageX, pageY } = ev.changedTouches[0];
            var { offsetLeft, offsetTop } = ev.changedTouches[0].target;
            offsetX = pageX - offsetLeft;
            offsetY = pageY - offsetTop;
            size = 40;
            renderShape(offsetX, offsetY, size);
            return;
        }
        var movement = Math.sqrt(movementX ** 2 + movementY ** 2);
        var size = 30 + 120 * movement / 200;
        renderShape(offsetX, offsetY, size);
    }
}

function onUp() {
    gIsDown = false;
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
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
