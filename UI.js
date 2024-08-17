function initDatGUI() {
    // Initialize the dat.GUI object
    const gui = new dat.GUI();

    // Define buttons as properties of an object
    let buttons = {
        regenerate: () => {
            setupGraphics(_saveCanvas);
        }
    };

    // Add sliders to the GUI
    gui.add(_params, 'rectAmount', 3, 50, 1).name('Rect amount')
        .onFinishChange(value => {
            setupGraphics(_saveCanvas);
        });
    gui.add(_params, 'ySymetry', 0, 1, 0.1).name('Y Symetry')
        .onFinishChange(value => {
            updateGraphics(_saveCanvas);
        });
    gui.add(_params, 'flunctiontion', 0, 1, 0.1).name('Y flunctiontion')
    gui.add(_params, 'boundariesMin', 0, _params.width / 2, 10).name('Boundaries min')
    gui.add(_params, 'boundariesMax', 0, _params.width / 2, 10).name('Boundaries max')


    gui.add(buttons, 'regenerate').name('regenerate');
    // You can add more sliders or other controls as needed
}