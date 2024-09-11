class myRect {
    constructor(idx, d1, y1, d2, y2, type, flunctiotion) {
        this.idx = idx
        this.dFactor1 = d1
        this.y1 = y1
        this.dFactor2 = d2
        this.y2 = y2

        this.inputType = type // type 0 in type 1 out

        this.flunctVal = flunctiotion

        this.count = 0
    }

    drawRect(cnv) {
        cnv.beginShape()
        cnv.noStroke()
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