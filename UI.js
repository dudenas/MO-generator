function updateBoundaries() {
    if (_params.graphicsHorizontal) {
        _params.boundariesMin = _params.height * _params.boundariesMinFactor / 2
        _params.boundariesMax = _params.height * _params.boundariesMaxFactor / 2
    } else {
        _params.boundariesMin = _params.width * _params.boundariesMinFactor / 2
        _params.boundariesMax = _params.width * _params.boundariesMaxFactor / 2
    }
}

let testScale = 1;

// Resizing the canvas
function scaleBasedOnWindow(elm, scale = 1, fit = false) {
    // get window width - UI-container width
    let targetScale = scale / (elm.clientWidth / (window.innerWidth - 360));
    // console.log(targetScale)
    scale = Math.max(0.1, scale);


    let scaleFactor = 0;
    if (fit) {
        scaleFactor = scale / Math.max(elm.clientWidth / window.innerWidth, elm.clientHeight / window.innerHeight);

        scaleFactor = Math.min(scaleFactor, targetScale);
        elm.style.transform = `scale(${Math.min(scaleFactor, scale)}) translate(-50%, -50%)`;
        elm.style.top = '50%';
        elm.style.left = 'calc(50% - 180px)';
    } else {
        scaleFactor = scale / Math.min(elm.clientWidth / window.innerWidth, elm.clientHeight / window.innerHeight);
        elm.style.transform = `scale(${Math.min(scaleFactor, scale)})`;
    }


    // strange thing but works
    testScale = targetScale > 1 ? min(1, scaleFactor) : targetScale;
}

function resizeCanvasOnScale() {
    const myCanvas = document.getElementById("myCanvas")
    scaleBasedOnWindow(myCanvas, 1., true)
    window.addEventListener("resize", () => {
        scaleBasedOnWindow(myCanvas, 1., true)
    })
}