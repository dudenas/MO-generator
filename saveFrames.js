// saving
let _saveFrames = false;
let _capturer;

//———————————————————————————————————— save
// in initialization phase
function saveSetupFrames() {
    _capturer = new CCapture({
        format: 'png',
        framerate: 30,
        verbose: false
    });
}

function saveDrawFrames(canvas) {
    if (_saveFrames) {
        // Add signature pixel (as tiny rectangle for SVG compatibility)
        drawSignature(canvas)

        _capturer.capture(canvas.elt);
        _recordedFrames++
        if (_recordedFrames > _totalSaveFrames) {
            console.log('finnished');
            _capturer.stop();
            _capturer.save();
            _saveFrames = false
            _recording = false
            _recordedFrames = 0
            saveSetupFrames()
        }
    }
}