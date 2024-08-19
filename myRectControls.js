// ————————————————————————————————————————————————————————————————————————————————— Collision
myRect.prototype.checkCollision = function (ellipseX, ellipseY, ellipseRadius) {
    const pMouseX = _params.graphicsHorizontal ? mouseY - height / 2 + width / 2 : mouseX
    const pMouseY = _params.graphicsHorizontal ? width - mouseX : mouseY;

    // Check if the mouse is hovering over the ellipse
    const distance = Math.sqrt((pMouseX - ellipseX - width / 2) ** 2 + (pMouseY - ellipseY) ** 2);
    const isHovered = distance < ellipseRadius / 2;
    return isHovered
}

// ————————————————————————————————————————————————————————————————————————————————— Draw controls
myRect.prototype.drawControls = function () {
    const ellipseX = _params.boundariesMax
    const ellipseY = this.y2
    const ellipseRadius = 20

    push()
    if (_params.graphicsHorizontal) {
        translate(width / 2, height / 2)
        rotate(PI / 2)
        translate(-width / 2, -height / 2)
        // translate(0, width / 2)
        translate(0, height / 2 - width / 2)
    }
    const pMouseX = _params.graphicsHorizontal ? mouseY - height / 2 + width / 2 : mouseX
    const pMouseY = _params.graphicsHorizontal ? width - mouseX : mouseY;
    ellipse(pMouseX, pMouseY, 50, 50)

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

    // TTYPE
    noFill()
    if (this.inputType) {
        fill(_params.colors.debug)
    }
    ellipse(width / 2 + 40, this.y2 - (this.y2 - this.y1) / 2, ellipseRadius, ellipseRadius)


    noStroke()
    fill(_params.colors.debug)
    textSize(12);
    text(this.inputType ? "in" : "out", width / 2 + 60, this.y2 - (this.y2 - this.y1) / 2 + 6)

    text(this.idx, width / 2 - 40, this.y2 - (this.y2 - this.y1) / 2 + 6)
    pop()
}

// ————————————————————————————————————————————————————————————————————————————————— Controls Y
myRect.prototype.controlsY = function () {
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
    } else {
        if (mouseIsPressed && _params.selectedLine == this.idx) {
            _params.selectedLine = null
        }
    }
}

// ————————————————————————————————————————————————————————————————————————————————— Controls Type
myRect.prototype.controlsType = function () {
    const exFlat = 40
    const eyFlat = this.y2 - (this.y2 - this.y1) / 2
    const erFlat = 20

    const flatEllipse = this.checkCollision(exFlat, eyFlat, erFlat)
    if (flatEllipse) {
        // check whether mouse is clicked
        if (mouseIsPressed && _params.selectedRect == null) {
            _params.selectedRect = this.idx
            this.inputType = !this.inputType
        }
        if (!mouseIsPressed) {
            _params.selectedRect = null
        }
    }
}

// ————————————————————————————————————————————————————————————————————————————————— Controls Flat
myRect.prototype.controlsFlat = function () {
    const exFlat = 0
    const eyFlat = this.y2 - (this.y2 - this.y1) / 2
    const erFlat = 20

    const flatEllipse = this.checkCollision(exFlat, eyFlat, erFlat)
    if (flatEllipse) {
        // check whether mouse is clicked
        if (mouseIsPressed && _params.selectedRect == null) {
            this.flat = !this.flat
            _params.selectedRect = this.idx

            // update rectangle type
            this.updateType()
        }
        if (!mouseIsPressed) {
            _params.selectedRect = null
        }
    }
}