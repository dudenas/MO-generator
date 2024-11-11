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
    _params[id] = id === "animationFrames" ? map(value, 0, 1, 60, 15) : value;
    console.log(_params[id])

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
    _params[id] = id === "animationFrames" ? map(value, 0, 1, 60, 15) : value;

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
    } else if (selectedValue === 'VIDEO') {
        if (_params.runAnimation) {
            _totalSaveFrames = (_params.animationFrames * _params.totalAnimationStages) + 1
            _recording = true
            _saveVideo = true
        } else {
            alert("Enable animation to save video")
        }
    } else if (selectedValue === 'SAVE_FRAMES') {
        if (_params.runAnimation) {
            _totalSaveFrames = (_params.animationFrames * _params.totalAnimationStages) + 1
            _recording = true
            _saveFrames = true
        } else {
            alert("Enable animation to save video")
        }
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

    _circleSize = min(_params.width / 20, _params.height / 20)

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

// 6. Colors
function invertColors(input) {
    _params.invertColors = input.checked;

    const temp = _params.colors.background
    _params.colors.background = _params.colors.main
    _params.colors.main = temp

    changeCustomColorFields()
}

// 7.Tooltip
document.addEventListener('DOMContentLoaded', () => {
    const tooltips = document.querySelectorAll('.tooltip');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.nextElementSibling;
            if (tooltipText && tooltipText.classList.contains('tooltiptext')) {
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            }
        });

        tooltip.addEventListener('mouseleave', () => {
            const tooltipText = tooltip.nextElementSibling;
            if (tooltipText && tooltipText.classList.contains('tooltiptext')) {
                tooltipText.style.visibility = 'hidden';
                tooltipText.style.opacity = '0';
            }
        });
    });
});