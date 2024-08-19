function initDatGUI() {
    // Initialize the dat.GUI object
    const gui = new dat.GUI();

    // Define buttons as properties of an object
    let buttons = {
        regenerateGraphics: () => {
            setupGraphics(_saveCanvas);
        },
        regenerateAnimation: () => {
            updateGraphics(_saveCanvas);
        }
    };

    // Add sliders to the GUI
    gui.add(_params, 'width', 100, 1920, 10).name('width')
        .onFinishChange(value => {
            _params.boundariesMin = _params.width * _params.boundariesMinFactor / 2
            _params.boundariesMax = _params.width * _params.boundariesMaxFactor / 2
            setupCanvas()
        });
    gui.add(_params, 'height', 100, 1920, 10).name('height')
        .onFinishChange(value => {
            _params.boundariesMin = _params.width * _params.boundariesMinFactor / 2
            _params.boundariesMax = _params.width * _params.boundariesMaxFactor / 2
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
    gui.add(_params, 'ySymetry', 0, 1, 0.1).name('Y Symetry')
        .onFinishChange(value => {
            updateGraphics(_saveCanvas);
        });
    gui.add(_params, 'flunctiotion', 0, 1, 0.1).name('Y flunctiotion').onFinishChange(value => {
        updateFlunctiotion();
    });
    gui.add(_params, 'boundariesMinFactor', 0, 1, .1).name('Boundaries min').onFinishChange(value => {
        _params.boundariesMin = _params.width * value / 2
    })
    gui.add(_params, 'boundariesMaxFactor', 0, 1, .1).name('Boundaries max').onFinishChange(value => {
        _params.boundariesMax = _params.width * value / 2
    })

    gui.add(_params, 'runAnimation').name('Run animation')
    gui.add(_params, 'animationWithin').name('animation within').onChange(value => {
        animationParamsGenerate(_saveCanvas);
    })
    gui.add(_params, 'flunctiotionNatural').name('flunctiotion natural')
    gui.add(_params, 'animationFrames', 20, 60, 1).name('Animation frames per stage')
    gui.add(_params, 'totalAnimationStages', 3, 7, 1).name('Animation stages').onFinishChange(value => {
        animationParamsGenerate(_saveCanvas);
    })


    gui.add(buttons, 'regenerateGraphics').name('new graphics');
    gui.add(buttons, 'regenerateAnimation').name('new animation');
    // You can add more sliders or other controls as needed
}