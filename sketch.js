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

    // init the saveSketch
    _saveSketch = new p5(svgSketch)

    pixelDensity(1)

    // set video canvas
    _saveCanvas = createGraphics(_params.width * _sclGrfc, _params.height * _sclGrfc);

    // noLoop()
}

function drawRect(cnv, d1, y1, d2, y2) {
    cnv.beginShape()
    cnv.vertex(-d1, y1)
    cnv.vertex(d1, y1)
    cnv.vertex(d2, y2)
    cnv.vertex(-d2, y2)
    cnv.endShape(cnv.CLOSE)
}


function drawGraphics(cnv) {
    // show image
    cnv.push()
    cnv.translate(cnv.width / 2, 0)

    // variable for amount of rectangles
    const amount = 9
    // loop trough amount of rectangles, and draw them one by one filling height of the canvas
    const boundaries = [cnv.width / 10, cnv.width / 5 * 2]
    let prevD = random(boundaries[0], boundaries[1])
    const flunctiontion = (boundaries[1] - boundaries[0]) / 2

    const randomY = generateRandomArray(amount)
    let isFlat = false

    let y1 = 0

    cnv.noStroke()
    for (let i = 0; i < amount; i++) {
        // const y2 = (i + 1) * cnv.height / amount
        const y2 = y1 + cnv.height * randomY[i]
        const d1 = prevD
        let d2 = i % 2 == 0 ? boundaries[1] - random(flunctiontion) : boundaries[0] + random(flunctiontion)

        if (random(1) < 0.2 && !isFlat) {
            d2 = d1
            isFlat = true
        }

        // set color
        if (i % 2 == 0) cnv.fill(_params.colors.main)
        else cnv.fill(_params.colors.shadow)

        // draw rect
        drawRect(cnv, d1, y1, d2, y2)
        prevD = d2
        y1 = y2
    }

    cnv.stroke(_params.colors.debug)
    cnv.strokeWeight(_params.strokeWeight)
    cnv.line(-boundaries[0], 0, -boundaries[0], cnv.height)
    cnv.line(boundaries[0], 0, boundaries[0], cnv.height)
    cnv.line(-boundaries[1], 0, -boundaries[1], cnv.height)
    cnv.line(boundaries[1], 0, boundaries[1], cnv.height)
    // cnv.translate(-cnv.width / 2, 0)
    cnv.pop()
}

function draw() {
    _saveCanvas.clear()

    background(_params.colors.background);

    // draw graphics
    drawGraphics(_saveCanvas)

    // show canvas
    image(_saveCanvas, 0, 0)

    // update framerate
    updateFrameRate()
}

function updateFrameRate() {
    document.getElementById('frameRate').innerText = `Frame Rate: ${Math.floor(frameRate())}`
}