function drawGraphics(cnv) {
    // show image
    cnv.push()
    cnv.translate(cnv.width / 2, 0)
    let finishedAnimation = 0
    _myRects.forEach(mr => {
        // do not do anything while parameters are in change
        if (_params.totalAnimationStages == mr.animationParams.length && _params.runAnimation) {
            mr.updateAnimation()
        }
        mr.updateLine()
        if (mr.idx < _myRects.length - 1) mr.controlsY()
        mr.controlsFlat()
        mr.controlsType()
        mr.update()
        mr.drawRect(cnv)

        finishedAnimation += mr.finished ? 1 : 0
    })

    if (finishedAnimation === _myRects.length) {
        resetAnimation()
    }

    // draw debug graphics
    // cnv.translate(-cnv.width / 2, 0)
    cnv.pop()
}

function resetAnimation() {
    // increase to the next animationindex
    _params.animationIndex = _params.animationIndex >= _params.totalAnimationStages - 1 ? 0 : _params.animationIndex + 1
    // reset count
    _myRects.forEach(mr => {
        mr.count = 0
        mr.finished = false
    })
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