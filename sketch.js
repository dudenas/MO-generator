function setup() {
    // setup canvas
    setupCanvas();

    // set framerate
    frameRate(_params.frameRate)
}


function setupCanvas(recreateGraphics = true) {
    // remove all previous canvases
    $('.p5Canvas').remove();

    const cnv = createCanvas(_params.width, _params.height)

    cnv.id('myCanvas');

    cnv.parent("myCanvasWrapper")

    pixelDensity(1)

    // set video canvas
    _saveCanvas = createGraphics(_params.width * _sclGrfc, _params.height * _sclGrfc);

    // setup graphics
    if (recreateGraphics) setupGraphics(_saveCanvas)
    else {
        updateBoundaries()
    }

    // resizable canvas to fit the window
    resizeCanvasOnScale()

    // init the saveSketch
    _saveSketch = new p5(svgSketch)

    // init the videoSketch
    _saveVideoSketch = new p5(videoSketch)

    // set save frames 
    saveSetupFrames()
}

let _myRects

function draw() {
    _saveCanvas.clear()
    if (_saveFrames) {
        _saveCanvas.background(_params.colors.background);
    }
    background(_params.colors.background);

    // draw graphics
    drawGraphics(_saveCanvas)

    // show save canvas
    image(_saveCanvas, 0, 0)

    // debug graphics
    debugGraphics()

    // show video update
    showVIDEOupdate()

    // update canvas if recording
    if (_recording) {
        if (_saveVideo) {
            _saveVideoSketch.drawSketch()
        }

        if (_saveFrames) {
            if (_recordedFrames === 0) {
                _capturer.start()
            }
            saveDrawFrames(_saveCanvas)
        }
    }

    // update framerate
    updateFrameRate()
}

function updateFrameRate() {
    document.getElementById('frameRate').innerText = `Frame Rate: ${Math.floor(frameRate())}`
}

// function draw() {
//     _saveCanvas.clear()

//     // set a background of canvas
//     if (!(_recording && _saveFrames)) {
//         _saveCanvas.background(_params.colors.background)
//     }


//     // show video update
//     showVIDEOupdate()

//     // update canvas if recording
//     if (_recording && _saveVideo) {
//         _saveVideoSketch.drawSketch()
//     }

//     // update framerate
//     updateFrameRate()

//     // save video frames
//     if (_recording && _saveFrames) {
//         if (_recordedFrames === 0) {
//             _capturer.start()
//         }
//         saveDrawFrames(_saveCanvas)
//     }
// }