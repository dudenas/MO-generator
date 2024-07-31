let _saveSVG = false
let _savePNG = false

//———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
let svgSketch = function (p) {
    //————————————————————————————————————————————— setup
    p.setup = function () {
        const canvas = p.createCanvas(_params.width, _params.height, p.SVG)
        // attach to the id
        const parent = document.getElementById('myCanvas')
        const child = canvas.canvas.wrapper
        parent.appendChild(child);
        $(child).css('display', 'none')

        p.noLoop()
    }

    p.draw = function () {
        p.clear()
        p.background(_params.colors.background);
        p.smooth(4)
        // drawGraphics(p)

        if (_saveSVG) {
            p.save(`${getSaveFilename()}.svg`)
            _saveSVG = false
        }

        if (_savePNG) {
            p.save(`${getSaveFilename()}.png`)
            _savePNG = false
        }
    }
}