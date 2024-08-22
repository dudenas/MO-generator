// ————————————————————————————————————————————————————————————————————————————————— Line
myRect.prototype.updateLine = function () {
    if (_params.selectedLine == this.idx) {
        // this.y1 = 0
        const max = _myRects[this.idx + 1].y2
        // const pMouseY = _params.graphicsHorizontal ? width - mouseX : mouseY;
        const pMouseY = _params.graphicsHorizontal ? width - mouseX / testScale : (mouseY / testScale);
        // let pMouseX = _params.graphicsHorizontal ? -1 * (height / 2 - width / 2) + (mouseY / testScale) : (mouseX / testScale)
        this.y2 = map(constrain(pMouseY, this.y1, max), this.y1, max, this.y1, max)
        _myRects[this.idx + 1].y1 = this.y2
    }
}

// ————————————————————————————————————————————————————————————————————————————————— Type
myRect.prototype.updateType = function () {
    const prevRect = this.idx > 1 ? _myRects[this.idx - 1] : null
    const nextRect = this.idx < _myRects.length - 1 ? _myRects[this.idx + 1] : null

    if (nextRect && !this.inputType) {
        // go trough rects from this idx and change all types
        for (let i = this.idx + 1; i < _myRects.length; i++) {
            const oRect = _myRects[i]
            if (!oRect.flat) {
                _myRects[i].inputType = !_myRects[i].inputType
            } else {
                break
            }
        }
    }
    if (prevRect && this.inputType) {
        // go trough rects from this idx and change all types
        for (let i = this.idx - 1; i >= 0; i--) {
            const oRect = _myRects[i]
            if (!oRect.flat) {
                _myRects[i].inputType = !_myRects[i].inputType
            } else {
                break
            }
        }
    }
}

// ————————————————————————————————————————————————————————————————————————————————— Animation
myRect.prototype.updateAnimation = function () {
    let percent = this.count / _params.animationFrames
    percent = normalizedErf(percent)

    const ap = this.animationParams[_params.animationIndex]
    if (percent <= 1 && percent > 0) {
        const prevIdx = _params.animationIndex === 0 ? _params.totalAnimationStages - 1 : _params.animationIndex - 1
        const ap_prev = this.animationParams[prevIdx]

        let temp = (this.y2 - this.y1) / _saveCanvas.height * (_params.rectAmount / 2)
        if (_params.graphicsHorizontal) {
            temp = (this.y2 - this.y1) / _saveCanvas.width * (_params.rectAmount / 2)
        }
        if (_params.flunctiotionNatural == true) {
            this.dFactor1 = constrain(temp, 0, 1)
        } else {
            this.dFactor1 = lerp(ap_prev.dFactor1, ap.dFactor1, percent)
        }
        this.y1 = lerp(ap_prev.y1, ap.y1, percent)
        if (_params.flunctiotionNatural == true) {
            this.dFactor2 = constrain(temp, 0, 1)
        } else {
            this.dFactor2 = lerp(ap_prev.dFactor2, ap.dFactor2, percent)
        }
        this.y2 = lerp(ap_prev.y2, ap.y2, percent)

        this.count++
    } else if (percent > 1) {
        this.finished = true
    } else if (percent <= 0) {
        this.count++
    }
}

function normalizedErf(_x) {
    var erfBound = 2.0; // set bounds for artificial "normalization"
    var erfBoundNorm = 0.99532226501; // this = erf(2.0), i.e., erf(erfBound)
    var z = map(_x, 0.0, 1.0, 0 - erfBound, erfBound);

    var z2 = z * z;
    var a = (8.0 * (PI - 3.0)) / ((3 * PI) * (4.0 - PI));
    var _y = sqrt(1.0 - exp(0 - z2 * ((a * z2 + 4.0 / PI) / (a * z2 + 1.0))));
    if (z < 0.0) _y = 0 - _y;

    _y /= erfBoundNorm;
    _y = (_y + 1.0) / 2.0;

    return (_y);
}

// ————————————————————————————————————————————————————————————————————————————————— MAIN UPDATE
myRect.prototype.update = function () {
    const flunctiontion = (_params.boundariesMax - _params.boundariesMin) / 2 * this.flunctVal

    let temp = (this.y2 - this.y1) / _saveCanvas.height * (_params.rectAmount / 2)
    if (_params.graphicsHorizontal) {
        temp = (this.y2 - this.y1) / _saveCanvas.width * (_params.rectAmount / 2)
    }
    if (!_params.runAnimation) {
        if (_params.flunctiotionNatural == true) {
            this.dFactor1 = constrain(temp, 0, 1)
            this.dFactor2 = constrain(temp, 0, 1)
        } else {
            this.dFactor1 = this.animationParams[_params.animationIndex].dFactor1
            this.dFactor2 = this.animationParams[_params.animationIndex].dFactor2
        }
    }

    this.d1 = this.idx > 0 ?
        _myRects[this.idx - 1].d2 :
        _params.boundariesMin + this.dFactor1 * flunctiontion
    this.d2 = this.inputType ?
        _params.boundariesMax - this.dFactor2 * flunctiontion :
        _params.boundariesMin + this.dFactor2 * flunctiontion


    if (this.idx == 0 && !this.inputType) {
        this.d1 = _params.boundariesMax - this.dFactor1 * flunctiontion
    }

    if (this.flat) {
        if (this.inputType) {
            this.d1 = this.d2
        } else {
            this.d2 = this.d1
        }
    }

    // edge case if next is flat
    if (this.idx < _myRects.length - 1 && _myRects[this.idx + 1].flat && !this.flat) {
        this.d2 = _myRects[this.idx + 1].d1
    }

}