let _lines = [];

function setup() {
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

    setupGraphics();

    // resizable canvas to fit the window
    resizeCanvasOnScale()

    // init the saveSketch
    _saveSketch = new p5(svgSketch)

    pixelDensity(1)
    // noLoop()

    // set video sketch
    _saveVideoSketch = new p5(videoSketch)

    // set video canvas
    _saveCanvas = createGraphics(_params.width * _sclGrfc, _params.height * _sclGrfc);

    // set save frames 
    saveSetupFrames()
}

function drawGraphics(cnv) {
    // show image
    showImage(cnv)

    cnv.beginShape();
    // style of the line
    cnv.stroke(_params.colors.main);
    cnv.strokeWeight(_params.strokeWeight);
    cnv.noFill();

    const firstX = _lines[0].xPos - _lines[0].gapX
    cnv.line(firstX, 0, firstX, height);
    for (let i = 0; i < _lines.length; i += _params.numPoints) {
        const x = _lines[i].xPos + _lines[i].gapX;
        const y1 = 0;
        const y2 = height;
        cnv.line(x, y1, x, y2);
    }

    // draw the bezier lines
    for (let i = 0; i < _lines.length; i++) {
        _lines[i].draw(cnv);
    }
    cnv.endShape();
}

function draw() {
    _saveCanvas.clear()

    // set a background of canvas
    if (!(_recording && _saveFrames)) {
        _saveCanvas.background(_params.colors.background)
    }

    // update the noise
    if (_params.noiseAnimate) {
        updateGraphics()
    } else {}

    background(_params.colors.background);

    // draw graphics
    drawGraphics(_saveCanvas)

    // show canvas
    image(_saveCanvas, 0, 0)

    // show video update
    showVIDEOupdate()

    // update canvas if recording
    if (_recording && _saveVideo) {
        _saveVideoSketch.drawSketch()
    }

    // update framerate
    updateFrameRate()

    // save video frames
    if (_recording && _saveFrames) {
        if (_recordedFrames === 0) {
            _capturer.start()
        }
        saveDrawFrames(_saveCanvas)
    }
}

function updateFrameRate() {
    document.getElementById('frameRate').innerText = `Frame Rate: ${Math.floor(frameRate())}`
}