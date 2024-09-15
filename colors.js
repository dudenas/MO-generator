// COLOR BUTTONS
$(document).ready(() => {
    // all the colors
    const colors = document.querySelectorAll(".clrs-btn")

    // Load colors from CSV file
    fetch('colors.csv')
        .then(response => response.text())
        .then(data => {
            const colorArray = parseCSV(data, ';'); // Pass the delimiter to the parseCSV function
            // console.log(colorArray[0])

            colors.forEach((elm, idx) => {
                $(elm).on("click", () => {
                    const colorSet = colorArray[Number(elm.dataset.index)];
                    if (colorSet) {
                        changeColors(colorSet[0], colorSet[1], colorSet[2], colorSet[3], colors, elm);
                        // console.log(colorSet[1]);
                    }
                });
            });
        })
        .catch(error => console.error('Error loading colors:', error));

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

function changeColors(col1, col2, col3, col4, colors, colSelected) {
    if (_params.invertColors) {
        const temp = col1
        col1 = col2
        col2 = temp
    }

    _params.colors.background = hexToRgb(col1)

    _params.colors.main = hexToRgb(col2)

    _params.colors.shadow = hexToRgb(col3)

    _params.colors.debug = hexToRgb(col4)

    // should be a color between the background and the main color
    // const bgRgb = _params.colors.background;
    // const mainRgb = _params.colors.main;

    // const shadowR = Math.floor((bgRgb[0] + mainRgb[0]) / 2);
    // const shadowG = Math.floor((bgRgb[1] + mainRgb[1]) / 2);
    // const shadowB = Math.floor((bgRgb[2] + mainRgb[2]) / 2);
    // _params.colors.shadow = [shadowR, shadowG, shadowB];

    changeCustomColorFields()

    colors.forEach(elm => {
        if (elm == colSelected) {
            $(elm).addClass("selected")
        } else {
            $(elm).removeClass("selected")
        }
    })
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
        _params.colors.main = hexToRgb(color)
    }
});

Coloris.setInstance('.instance2', {
    onChange: (color, input) => {
        _params.colors.shadow = hexToRgb(color)
    }
});

Coloris.setInstance('.instance3', {
    onChange: (color, input) => {
        _params.colors.background = hexToRgb(color)
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