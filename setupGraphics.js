function setupGraphics(cnv) {
    _myRects = []

    for (let i = 0; i < _params.rectAmount; i++) {
        const mr = new myRect()
        _myRects.push(mr)
        mr.inputType = i % 2 == 0
    }

    updateGraphics(cnv)

    animationParamsGenerate(cnv)

    updateBoundaries()
}

function setupGraphicsUpdate(cnv) {
    updateGraphics(cnv)

    animationParamsGenerate(cnv)

    updateBoundaries()
}

function animationParamsGenerate(cnv) {
    _params.animationIndex = 0

    for (let n = 0; n < _params.totalAnimationStages; n++) {
        // loop trough amount of rectangles, and draw them one by one filling height of the canvas
        const randomY = generateRandomArrayZero(_params.rectAmount, _params.ySymetry, 0.01, _params.animationWithin)

        let y1 = 0

        for (let i = 0; i < _params.rectAmount; i++) {
            // const y2 = y1 + cnv.width * randomY[i]
            let y2 = y1 + cnv.height * randomY[i]
            if (_params.graphicsHorizontal) {
                y2 = y1 + cnv.width * randomY[i]
            }
            let d1 = random(1) // works only for the first one
            let d2 = random(1)

            const mr = _myRects[i]

            // setup animation initial params
            if (n === 0) {
                mr.animationParams = [];
            }

            mr.animationParams[n] = {
                y1: y1,
                y2: y2,
                dFactor1: d1,
                dFactor2: d2
            }

            y1 = y2
        }
    }


    resetAnimation()
}

function updateGraphics(cnv) {
    // loop trough amount of rectangles, and draw them one by one filling height of the canvas
    const randomY = generateRandomArray(_params.rectAmount, _params.ySymetry, 0.01)

    let y1 = 0

    for (let i = 0; i < _params.rectAmount; i++) {
        let y2 = y1 + cnv.height * randomY[i]
        if (_params.graphicsHorizontal) {
            y2 = y1 + cnv.width * randomY[i]
        }
        let d1 = random(1) // works only for the first one
        let d2 = random(1)

        const mr = _myRects[i]

        // update factors
        mr.idx = i
        mr.dFactor1 = d1
        mr.y1 = y1
        mr.dFactor2 = d2
        mr.y2 = y2
        // mr.inputType = i % 2 == 0
        mr.flunctVal = _params.flunctiotion

        y1 = y2
    }

    animationParamsGenerate(cnv)
}

function updateFlunctiotion() {
    for (let i = 0; i < _params.rectAmount; i++) {
        const mr = _myRects[i]
        mr.flunctVal = _params.flunctiotion
    }
}