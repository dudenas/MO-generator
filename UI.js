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

    gui.width = 500;

    // Define buttons as properties of an object
    let buttons = {
        regenerateGraphics: () => {
            setupGraphics(_saveCanvas);
        },
        saveSVG: () => {
            _saveSVG = true
            _saveSketch.redraw()
        },
        savePNG: () => {
            _savePNG = true
            _saveSketch.redraw()
        }
    };

    // Add sliders to the GUI
    gui.add(_params, 'width', 100, 1920, 10).name('width')
        .onFinishChange(value => {
            setupCanvas()
        });
    gui.add(_params, 'height', 100, 1920, 10).name('height')
        .onFinishChange(value => {
            setupCanvas()
        });

    gui.add(_params, 'graphicsHorizontal').name('Horizontal').onFinishChange(value => {
        setupGraphics(_saveCanvas)
    })

    // Add sliders to the GUI
    gui.add(_params, 'rectAmount', 3, 21, 1).name('Rect amount')
        .onFinishChange(value => {
            setupGraphics(_saveCanvas);
        });
    gui.add(_params, 'ySymetry', 0, 1, 0.1).name('Size of elements between')
        .onFinishChange(value => {
            updateGraphics(_saveCanvas);
        });
    gui.add(_params, 'flunctiotion', 0, 1, 0.1).name('Element flunctiotion to sides').onFinishChange(value => {
        updateFlunctiotion();
    });
    gui.add(_params, 'boundariesMinFactor', 0, 1, .1).name('Boundaries min').onFinishChange(value => {
        updateBoundaries()
    })
    gui.add(_params, 'boundariesMaxFactor', 0, 1, .1).name('Boundaries max').onFinishChange(value => {
        updateBoundaries()
    })

    gui.add(_params, 'runAnimation').name('Run animation')
    gui.add(_params, 'animationWithin').name('animation within').onChange(value => {
        animationParamsGenerate(_saveCanvas);
        updateGraphics(_saveCanvas)
    })
    gui.add(_params, 'flunctiotionNatural').name('flunctiotion natural')
    gui.add(_params, 'animationFrames', 20, 60, 1).name('Animation frames per stage')
    gui.add(_params, 'totalAnimationStages', 3, 7, 1).name('Animation stages').onFinishChange(value => {
        animationParamsGenerate(_saveCanvas);
        updateGraphics(_saveCanvas)
    })


    gui.add(buttons, 'regenerateGraphics').name('new graphics');
    // You can add more sliders or other controls as needed
    gui.add(buttons, 'saveSVG').name('save SVG');
    gui.add(buttons, 'savePNG').name('save PNG');
}

let testScale = 1;

// Resizing the canvas
function scaleBasedOnWindow(elm, scale = 1, fit = false) {
    // get window width - UI-container width
    // let targetScale = scale / (elm.clientWidth / (window.innerWidth - 462 - 48));
    let targetScale = scale / (elm.clientWidth / (window.innerWidth));
    scale = Math.max(0.1, scale);

    let scaleFactor = 0;
    if (fit) {
        scaleFactor = scale / Math.max(elm.clientWidth / window.innerWidth, elm.clientHeight / window.innerHeight);

        scaleFactor = Math.min(scaleFactor, targetScale);
        elm.style.transform = `scale(${Math.min(scaleFactor, scale)}) translate(-50%, -50%)`;
        elm.style.top = '50%';
        elm.style.left = '50%';

        testScale = Math.min(scaleFactor, scale);
    } else {
        scaleFactor = scale / Math.min(elm.clientWidth / window.innerWidth, elm.clientHeight / window.innerHeight);
        elm.style.transform = `scale(${Math.min(scaleFactor, scale)})`;

        testScale = Math.min(scaleFactor, scale);
    }
}

function resizeCanvasOnScale() {
    const myCanvas = document.getElementById("myCanvas")
    scaleBasedOnWindow(myCanvas, 1., true)
    window.addEventListener("resize", () => {
        scaleBasedOnWindow(myCanvas, 1., true)
    })
}