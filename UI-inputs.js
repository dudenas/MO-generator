// 1. Sliders
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// update sliders on load for CSS
window.onload = function () {
    // query all ids which has -slider in name
    const sliders = document.querySelectorAll('[id$="-slider"]');
    // go trough sliders and updatesliderprogress
    sliders.forEach(slider => {
        updateSliderProgress(slider, slider.value, slider.min, slider.max);
    });

}

function updateSliderHTML(sliderName) {
    const slider = document.getElementById(`${sliderName}-slider`)
    document.getElementById(`${sliderName}-slider`).value = _params[sliderName];
    document.getElementById(`${sliderName}-number`).value = _params[sliderName];
    updateSliderProgress(slider, slider.value, slider.min, slider.max);
}

function updateSlider(input, updateCanvas = true) {
    if (input.value < Number(input.min)) {
        input.value = Number(input.min);
    }

    if (input.value > Number(input.max)) {
        input.value = Number(input.max);
    }

    // get the value of the slider
    const value = Number(input.value);
    // get the id of the slider
    const id = input.id.split('-')[0];

    // update the value of the slider
    document.getElementById(`${id}-slider`).value = value;
    updateSliderProgress(document.getElementById(`${id}-slider`), value, Number(input.min), Number(input.max));

    _params[id] = id === "flunctiotion" ? 1 - value : value;

    if (updateCanvas === true) {
        setupCanvas()
    } else if (updateCanvas === false) {
        updateBoundaries()
    } else if (updateCanvas === 2) {
        updateFlunctiotion()
    } else if (updateCanvas === 3) {
        updateGraphics(_saveCanvas);
    } else if (updateCanvas === 4) {

    } else if (updateCanvas === 5) {
        animationParamsGenerate(_saveCanvas);
        updateGraphics(_saveCanvas)
    }
}


function updateInput(input, updateCanvas = true) {
    // get the value of the slider
    const value = Number(input.value);
    // get the id of the slider
    const id = input.id.split('-')[0];

    // update the value of the slider
    document.getElementById(`${id}-number`).value = value;

    updateSliderProgress(document.getElementById(`${id}-slider`), value, Number(input.min), Number(input.max));

    _params[id] = id === "flunctiotion" ? 1 - value : value;

    if (updateCanvas === true) {
        setupCanvas()
    } else if (updateCanvas === false) {
        updateBoundaries()
    } else if (updateCanvas === 2) {
        updateFlunctiotion()
    } else if (updateCanvas === 3) {
        updateGraphics(_saveCanvas);
    } else
    if (updateCanvas === 4) {

    } else if (updateCanvas === 5) {
        animationParamsGenerate(_saveCanvas);
        updateGraphics(_saveCanvas)
    }
}


function updateSliderProgress(elm, value, min, max) {
    const progress = ((value - min) / (max - min)) * 100;
    elm.style.background = `linear-gradient(to right, var(--color-white) ${progress}%, var(--color-gray-2) ${progress}%)`;
}

// 1. Buttons
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
document.querySelector('#buttonRandomisePattern').addEventListener('click', () => {
    setupGraphics(_saveCanvas);
});

document.querySelector('#exportCanvas').addEventListener('click', () => {
    // Get the selected value from the dropdown
    const selectElement = document.querySelector('#exportOption'); // Replace with your actual select element ID
    const selectedValue = selectElement.value;

    if (selectedValue === 'PNG') {
        _savePNG = true
    } else if (selectedValue === 'SVG') {
        _saveSVG = true
    }

    _saveSketch.redraw()
});

// 2. Canvas
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// write a function <input id="paramsTempWidth" type="number" min="100" step="2" onchange="ensureEven(this)"> that ensures the number is even
function ensureCorrectInputResolution(input) {
    if (input.value % 2 !== 0) {
        input.value = Number(input.value) + 1;
    }


    if (input.value < Number(input.min)) {
        input.value = Number(input.min);
    }

    if (input.value > Number(input.max)) {
        input.value = Number(input.max);
    }

    if (input.id === 'paramsTempWidth') {
        _params.tempWidth = Number(input.value);
    }

    if (input.id === 'paramsTempHeight') {
        _params.tempHeight = Number(input.value);
    }
}

document.querySelector('#applyResolutionChange').addEventListener('click', () => {
    _params.width = _params.tempWidth;
    _params.height = _params.tempHeight;

    console.log(_params.width, _params.height, _params.tempWidth, _params.tempHeight)
    // setupCanvas(recreateGraphics = false);
    setupCanvas();
});


// 3. Orientation
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function updateOrientation(dropdown) {
    if (dropdown.value == 'horizontal') {
        _params.graphicsHorizontal = true
    } else {
        _params.graphicsHorizontal = false
    }
    setupCanvas()
}

// 4. Flunctiotion
function flunctiotionNatural(input) {
    // get the value of the checkbox
    _params.flunctiotionNatural = input.checked;
}

// 5. Animate
function animateWithin(input) {
    // get the value of the checkbox
    _params.animationWithin = input.checked;

    animationParamsGenerate(_saveCanvas);
    updateGraphics(_saveCanvas)
}

function animateGraphics(input) {
    // get the value of the checkbox
    _params.runAnimation = input.checked;
}