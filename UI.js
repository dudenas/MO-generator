function updateBoundaries() {
    if (_params.graphicsHorizontal) {
        _params.boundariesMin = _params.height * _params.boundariesMinFactor / 2
        _params.boundariesMax = _params.height * _params.boundariesMaxFactor / 2
    } else {
        _params.boundariesMin = _params.width * _params.boundariesMinFactor / 2
        _params.boundariesMax = _params.width * _params.boundariesMaxFactor / 2
    }
}

function initDatGUI() {
    // Initialize the dat.GUI object
    const gui = new dat.GUI();

    gui.close();

    gui.width = 500;

    // Define buttons as properties of an object
    let buttons = {
        saveSVG: () => {
            _saveSVG = true
            _saveSketch.redraw()
        },
        savePNG: () => {
            _savePNG = true
            _saveSketch.redraw()
        }
    };


    // You can add more sliders or other controls as needed
    gui.add(buttons, 'saveSVG').name('save SVG');
    gui.add(buttons, 'savePNG').name('save PNG');
}

let testScale = 1;

// Resizing the canvas
function scaleBasedOnWindow(elm, scale = 1, fit = false) {
    // get window width - UI-container width
    let targetScale = scale / (elm.clientWidth / (window.innerWidth - 360));
    console.log(targetScale)
    scale = Math.max(0.1, scale);

    testScale = targetScale;

    let scaleFactor = 0;
    if (fit) {
        scaleFactor = scale / Math.max(elm.clientWidth / window.innerWidth, elm.clientHeight / window.innerHeight);

        scaleFactor = Math.min(scaleFactor, targetScale);
        elm.style.transform = `scale(${Math.min(scaleFactor, scale)}) translate(0, -50%)`;
        elm.style.top = '50%';
        elm.style.left = '0%';
    } else {
        scaleFactor = scale / Math.min(elm.clientWidth / window.innerWidth, elm.clientHeight / window.innerHeight);
        elm.style.transform = `scale(${Math.min(scaleFactor, scale)})`;
    }
}

function resizeCanvasOnScale() {
    const myCanvas = document.getElementById("myCanvas")
    scaleBasedOnWindow(myCanvas, 1., true)
    window.addEventListener("resize", () => {
        scaleBasedOnWindow(myCanvas, 1., true)
    })
}