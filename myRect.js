class myRect {
    constructor(idx, d1, y1, d2, y2, type) {
        this.idx = idx
        this.dFactor1 = d1
        this.y1 = y1
        this.dFactor2 = d2
        this.y2 = y2


        this.inputType = type // type 0 in type 1 out
    }

    updateLine() {
        if (_params.selectedLine == this.idx) {
            // this.y1 = 0
            const max = _myRects[this.idx + 1].y2
            this.y2 = map(constrain(mouseY, this.y1, max), this.y1, max, this.y1, max)
            _myRects[this.idx + 1].y1 = this.y2
        }
    }

    updateType() {
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

    update() {
        const flunctiontion = (_params.boundariesMax - _params.boundariesMin) / 2 * _params.flunctiontion

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
        if (this.idx < _myRects.length - 1 && _myRects[this.idx + 1].flat) {
            this.d2 = _myRects[this.idx + 1].d1
        }

    }

    drawRect(cnv) {
        cnv.beginShape()
        // every other colored differently
        if (this.idx % 2 == 0) {
            cnv.fill(_params.colors.main)
        } else {
            cnv.fill(_params.colors.shadow)
        }
        cnv.vertex(-this.d1, this.y1)
        cnv.vertex(this.d1, this.y1)
        cnv.vertex(this.d2, this.y2)
        cnv.vertex(-this.d2, this.y2)
        cnv.endShape(cnv.CLOSE)
    }
}