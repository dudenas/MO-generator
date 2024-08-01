function setup() {
    initDatGUI()

    // setup canvas
    setupCanvas();

    // set framerate
    frameRate(_params.frameRate)
}


function setupCanvas() {
    // remove all previous canvases
    $('.p5Canvas').remove();

    const cnv = createCanvas(_params.width, _params.height)

    cnv.id('myCanvas');

    cnv.parent("myCanvasWrapper")

    // init the saveSketch
    _saveSketch = new p5(svgSketch)

    pixelDensity(1)

    // set video canvas
    _saveCanvas = createGraphics(_params.width * _sclGrfc, _params.height * _sclGrfc);

    // setup graphics
    setupGraphics(_saveCanvas)

    // noLoop()
}

let _myRects

function drawGraphics(cnv) {
    // show image
    cnv.push()
    cnv.translate(cnv.width / 2, 0)
    _myRects.forEach(mr => {
        mr.updateLine()
        if (mr.idx < _myRects.length - 1) mr.controlsY()
        mr.controlsFlat()
        mr.update()
        mr.drawRect(cnv)
    })

    // draw debug graphics
    // cnv.translate(-cnv.width / 2, 0)
    cnv.pop()
}

function debugGraphics() {
    _myRects.forEach(mr => {
        mr.drawControls()
    })

    // lines
    stroke(_params.colors.debug)
    strokeWeight(_params.strokeWeight)
    line(-_params.boundariesMin + width / 2, 0, -_params.boundariesMin + width / 2, height)
    line(_params.boundariesMin + width / 2, 0, _params.boundariesMin + width / 2, height)
    line(-_params.boundariesMax + width / 2, 0, -_params.boundariesMax + width / 2, height)
    line(_params.boundariesMax + width / 2, 0, _params.boundariesMax + width / 2, height)
}

function draw() {
    _saveCanvas.clear()

    background(_params.colors.background);


    // draw graphics
    drawGraphics(_saveCanvas)

    // show canvas
    image(_saveCanvas, 0, 0)

    // debug graphics
    debugGraphics()

    // update framerate
    updateFrameRate()
}

function updateFrameRate() {
    document.getElementById('frameRate').innerText = `Frame Rate: ${Math.floor(frameRate())}`
}