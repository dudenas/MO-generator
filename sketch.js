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

function draw() {
    _saveCanvas.clear()

    background(_params.colors.background);

    // draw graphics
    drawGraphics(_saveCanvas)

    // show canvas
    // translate(width / 2, height / 2)
    // rotate(PI / 2)
    // const ratioX = _params.height / _params.width
    // const ratioY = _params.width / _params.height
    // scale(ratioX, ratioY)
    // translate(-width / 2, -height / 2)

    image(_saveCanvas, 0, 0)

    // debug graphics
    debugGraphics()

    // update framerate
    updateFrameRate()
}

function updateFrameRate() {
    document.getElementById('frameRate').innerText = `Frame Rate: ${Math.floor(frameRate())}`
}