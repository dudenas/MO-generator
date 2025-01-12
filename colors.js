// COLOR BUTTONS
$(document).ready(() => {
    // all the colors
    const colors = document.querySelectorAll(".clrs-btn");

    // Load regular colors
    fetch('colors.csv')
        .then(response => response.text())
        .then(data => {
            colorArray = parseCSV(data, ';');

            // Set default colors from first row of colors.csv
            const defaultColors = colorArray[0];
            if (defaultColors) {
                _params.colors.background = hexToRgb(defaultColors[0]);
                _params.colors.main = hexToRgb(defaultColors[1]);
                _params.colors.shadow = hexToRgb(defaultColors[2]);
                _params.colors.debug = hexToRgb(defaultColors[3]);
                changeCustomColorFields();
            }

            // Add click event listeners to color buttons
            colors.forEach((elm, idx) => {
                elm.addEventListener("click", () => {
                    // Remove selected class from all buttons
                    colors.forEach(btn => btn.classList.remove("selected"));

                    // Add selected class to clicked button
                    elm.classList.add("selected");

                    // Reset the customized colors flag when a color button is clicked
                    _hasCustomizedColors = false;

                    const colorSet = colorArray[Number(elm.dataset.index) + 1];
                    if (colorSet) {
                        changeColors(colorSet[0], colorSet[1], colorSet[2], colorSet[3], colors, elm);
                    }
                });
            });
        })
        .catch(error => console.error('Error loading colors:', error));

    // Load MP4 colors
    fetch('colors-mp4.csv')
        .then(response => response.text())
        .then(data => {
            mp4ColorArray = parseCSV(data, ';');
        })
        .catch(error => console.error('Error loading MP4 colors:', error));

    // Load colors from CSV file
    fetch('swatches.csv')
        .then(response => response.text())
        .then(data => {
            const colorArray = parseCSV(data, ','); // Pass the delimiter to the parseCSV function
            // console.log(colorArray[0])

            // collorArray should be transpossed. Imagine it is now 4x8 and it should be 8x4
            const transposedArray = colorArray[0].map((_, colIndex) => colorArray.map(row => row[colIndex]));


            swatchesCsv = []
            transposedArray.forEach((elm, idx) => {
                const colorSet = transposedArray[idx];
                for (let i = 0; i < colorSet.length; i++) {
                    swatchesCsv.push(colorSet[i]);
                }
            });

            // rearange swatches, it should be transposed matrix, if start from 0, 1 element should be 8, 2, 16 etc.
            // console.log(swatchesCsv)


            Coloris({
                swatches: swatchesCsv
            });
        })
        .catch(error => console.error('Error loading colors:', error));



})


function parseCSV(data, delimiter = ',') {
    const lines = data.split('\n');
    return lines.map(line => line.trim().split(delimiter).map(item => item.trim()));
}

let currentColorSetIndex = 0; // Store the current color set index

function changeColors(col1, col2, col3, col4, colors, colSelected) {
    currentColorSetIndex = colSelected ? Number(colSelected.dataset.index) : -1;

    if (_params.invertColors) {
        const temp = col1;
        col1 = col2;
        col2 = temp;
    }

    _params.colors.background = hexToRgb(col1);
    _params.colors.main = hexToRgb(col2);
    _params.colors.shadow = hexToRgb(col3);
    _params.colors.debug = hexToRgb(col4);

    changeCustomColorFields();
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

Coloris({
    el: '.coloris',
    theme: 'polaroid',
    themeMode: 'dark',
    swatchesOnly: false,
    alpha: false,
    format: 'hex',
    input: "#F4F0EC",
    // formatToggle: true,
    swatches: []
});

Coloris.setInstance('.instance1', {
    onChange: (color, input) => {
        _params.colors.main = hexToRgb(color);
        _hasCustomizedColors = true;
    }
});

Coloris.setInstance('.instance2', {
    onChange: (color, input) => {
        _params.colors.shadow = hexToRgb(color);
        _hasCustomizedColors = true;
    }
});

Coloris.setInstance('.instance3', {
    onChange: (color, input) => {
        _params.colors.background = hexToRgb(color);
        _hasCustomizedColors = true;
    }
});

// get this html element and change it's value .instance1
_colorMain = document.querySelector('.instance1')
_colorShadow = document.querySelector('.instance2')
_colorBackground = document.querySelector('.instance3')


function changeCustomColorFields() {
    _colorMain.value = rgbToHex(_params.colors.main[0], _params.colors.main[1], _params.colors.main[2])
    _colorShadow.value = rgbToHex(_params.colors.shadow[0], _params.colors.shadow[1], _params.colors.shadow[2])
    _colorBackground.value = rgbToHex(_params.colors.background[0], _params.colors.background[1], _params.colors.background[2])

    _colorMain.dispatchEvent(new Event('input', {
        bubbles: true
    }));
    _colorShadow.dispatchEvent(new Event('input', {
        bubbles: true
    }));
    _colorBackground.dispatchEvent(new Event('input', {
        bubbles: true
    }));

}

function getCurrentMP4ColorSet() {
    return colorArray[currentColorSetIndex];
}

// Add function to restore default colors
function restoreDefaultColors() {
    const defaultColors = colorArray[0];
    if (defaultColors) {
        _params.colors.background = hexToRgb(defaultColors[0]);
        _params.colors.main = hexToRgb(defaultColors[1]);
        _params.colors.shadow = hexToRgb(defaultColors[2]);
        _params.colors.debug = hexToRgb(defaultColors[3]);
        changeCustomColorFields();
    }
}