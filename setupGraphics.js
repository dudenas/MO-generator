function setupGraphics(cnv) {
    _myRects = []

    // variable for amount of rectangles
    // loop trough amount of rectangles, and draw them one by one filling height of the canvas
    const randomY = generateRandomArray(_params.rectAmount, _params.ySymetry, 0.01)

    let y1 = 0

    for (let i = 0; i < _params.rectAmount; i++) {
        const y2 = y1 + cnv.height * randomY[i]
        let d1 = random(1) // works only for the first one
        let d2 = random(1)

        const mr = new myRect(i, d1, y1, d2, y2, i % 2 == 0)
        _myRects.push(mr)

        y1 = y2
    }
}

function updateGraphics(cnv) {
    // loop trough amount of rectangles, and draw them one by one filling height of the canvas
    const randomY = generateRandomArray(_params.rectAmount, _params.ySymetry, 0.01)

    let y1 = 0

    for (let i = 0; i < _params.rectAmount; i++) {
        const y2 = y1 + cnv.height * randomY[i]
        let d1 = random(1) // works only for the first one
        let d2 = random(1)

        const mr = _myRects[i]

        // update factors
        mr.dFactor1 = d1
        mr.y1 = y1
        mr.dFactor2 = d2
        mr.y2 = y2

        y1 = y2
    }
}