class myRect {
    constructor(idx, d1, y1, d2, y2) {
        this.idx = idx
        this.dFactor1 = d1
        this.y1 = y1
        this.dFactor2 = d2
        this.y2 = y2
    }

    updateLine() {
        if (_params.selectedLine == this.idx) {
            // this.y1 = 0
            const max = _myRects[this.idx + 1].y2
            this.y2 = map(constrain(mouseY, this.y1, max), this.y1, max, this.y1, max)
            _myRects[this.idx + 1].y1 = this.y2
        }
    }

    drawControls() {
        const ellipseX = _params.boundariesMax
        const ellipseY = this.y2
        const ellipseRadius = 20

        push()
        noFill()
        if (_params.selectedLine == this.idx) {
            fill(_params.colors.debug)
        }
        strokeWeight(_params.strokeWeight)
        stroke(_params.colors.debug)
        ellipse(ellipseX + width / 2, ellipseY, ellipseRadius, ellipseRadius)


        noFill()
        if (this.flat) {
            fill(_params.colors.debug)
        }
        ellipse(width / 2, this.y2 - (this.y2 - this.y1) / 2, ellipseRadius, ellipseRadius)
        pop()
    }

    controlsY() {
        const ellipseX = _params.boundariesMax
        const ellipseY = this.y2
        const ellipseRadius = 20

        const sideEllipse = this.checkCollision(ellipseX, ellipseY, ellipseRadius)
        if (sideEllipse) {
            // check whether mouse is clicked
            if (mouseIsPressed && _params.selectedLine == null) {
                // _params.selectedLine = this.idx
                _params.selectedLine = this.idx
            }
            // if mouse is released
            else if (!mouseIsPressed) {
                _params.selectedLine = null
            }
        }
    }

    controlsFlat() {
        const exFlat = 0
        const eyFlat = this.y2 - (this.y2 - this.y1) / 2
        const erFlat = 20


        const flatEllipse = this.checkCollision(exFlat, eyFlat, erFlat)
        if (flatEllipse) {
            // check whether mouse is clicked
            if (mouseIsPressed && _params.selectedRect == null) {
                this.flat = !this.flat
                _params.selectedRect = this.idx
            }
            if (!mouseIsPressed) {
                _params.selectedRect = null
            }
        }
    }

    update() {
        const flunctiontion = (_params.boundariesMax - _params.boundariesMin) / 2 * _params.flunctiontion

        this.d1 = this.idx > 0 ? _myRects[this.idx - 1].d2 : _params.boundariesMin + this.dFactor1 * flunctiontion
        this.d2 = this.idx % 2 == 0 ? _params.boundariesMax - this.dFactor2 * flunctiontion : _params.boundariesMin + this.dFactor2 * flunctiontion

        if (this.flat) {
            this.d2 = this.d1
        }

        // TODO: check this one and maybe improve it
        // if (this.idx == 2) {
        //     this.dFactor2 = map(mouseX, 0, width, 0, 1)
        // }
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

    checkCollision(ellipseX, ellipseY, ellipseRadius) {
        // Check if the mouse is hovering over the ellipse
        const distance = Math.sqrt((mouseX - ellipseX - width / 2) ** 2 + (mouseY - ellipseY) ** 2);
        const isHovered = distance < ellipseRadius / 2;
        return isHovered
    }
}