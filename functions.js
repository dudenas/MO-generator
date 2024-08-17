// hexToRgb: Converts a hex color to an RGB object
function hexToRgb(hex) {
    // Remove the hash if it's included
    hex = hex.replace(/^#/, '');

    // Parse the hex value to integers
    var bigint = parseInt(hex, 16);

    // Extract RGB components
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    // Return the RGB values as an object
    return [r, g, b];
}

// getSaveFilename: Generates a filename based on the current date
function getSaveFilename() {
    // Get current date and time
    var currentDate = new Date();

    // Extract year, month, and day
    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-indexed
    var day = ('0' + currentDate.getDate()).slice(-2);

    // Concatenate year, month, and day in the format YYYYMMDD
    var formattedDate = year + month + day;
    return "LSU-" + formattedDate
}

// generateRandomArray: Generates an array of random numbers that sum to 1
function generateRandomArray(numPoints, diversity, minValue) {
    // Generate random values
    const randomValues = Array.from({
        length: numPoints
    }, () => Math.random());

    // Calculate the sum of random values
    const sum = randomValues.reduce((a, b) => a + b, 0);

    // Normalize the values
    const normalizedValues = randomValues.map(value => value / sum);

    // Adjust values based on diversity
    const equalValue = 1 / numPoints;
    let adjustedValues = normalizedValues.map(value =>
        value * (1 - diversity) + equalValue * diversity
    );

    // Ensure values are not less than minValue
    adjustedValues = adjustedValues.map(value => Math.max(value, minValue));

    // Normalize the adjusted values again to ensure they sum to 1
    const adjustedSum = adjustedValues.reduce((a, b) => a + b, 0);
    const finalValues = adjustedValues.map(value => value / adjustedSum);

    return finalValues;
}