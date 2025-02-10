let _saveSketch
let _saveVideoSketch
let _saveVideo = false
let _videoCanvas = null
let _recordedFrames = 0
let _totalSaveFrames = 0
let _recording = false
let _stopRecording = false
let _encoderInitializing = false
let encoder = null
let chunks = []
let _restoreColors = null
let _hasCustomizedColors = false

function initMP4Encoder() {
    try {
        chunks = [];
        // Check if any color button is selected using the same selector jQuery uses internally
        const selectedColorBtn = document.querySelector('.clrs-btn.selected');

        // Save current colors to restore later
        const savedColors = {
            main: _params.colors.main.slice(),
            shadow: _params.colors.shadow.slice(),
            background: _params.colors.background.slice(),
            debug: _params.colors.debug.slice()
        };

        // Save inversion state but don't change it
        const wasInverted = _params.invertColors;

        // Use appropriate color set and apply immediately
        const mp4ColorSet = mp4ColorArray[selectedColorBtn ? currentColorSetIndex + 1 : 0];

        if (!_hasCustomizedColors) {
            if (selectedColorBtn) {
                // For selected colors, use the same pattern as changeColors()
                let col1 = mp4ColorSet[0];
                let col2 = mp4ColorSet[1];

                if (_params.invertColors) {
                    const temp = col1;
                    col1 = col2;
                    col2 = temp;
                }

                _params.colors.background = hexToRgb(col1);
                _params.colors.main = hexToRgb(col2);
                _params.colors.shadow = hexToRgb(mp4ColorSet[2]);
                _params.colors.debug = hexToRgb(mp4ColorSet[3]);
            } else {
                let col1 = mp4ColorSet[0];
                let col2 = mp4ColorSet[1];

                if (_params.invertColors) {
                    const temp = col1;
                    col1 = col2;
                    col2 = temp;
                }

                _params.colors.background = hexToRgb(col1);
                _params.colors.main = hexToRgb(col2);
                _params.colors.shadow = hexToRgb(mp4ColorSet[2]);
                _params.colors.debug = hexToRgb(mp4ColorSet[3]);
            }
        }

        changeCustomColorFields(); // Update colors immediately

        // Wait for next frame to ensure colors are applied
        requestAnimationFrame(() => {
            const stream = _videoCanvas.canvas.captureStream(30);

            // Try to get the best video format supported by the browser
            const mimeTypes = [
                'video/mp4;codecs=avc1.64001F',
                'video/webm;codecs=vp9',
                'video/webm;codecs=vp8',
                'video/webm'
            ];

            let selectedMimeType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type));

            if (!selectedMimeType) {
                throw new Error('No supported video MIME type found');
            }

            encoder = new MediaRecorder(stream, {
                mimeType: selectedMimeType,
                videoBitsPerSecond: 50000000,
                frameRate: 30
            });

            encoder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            encoder.start();
            _encoderInitializing = false;
        });

        // Store the color restoration function
        _restoreColors = () => {
            _params.colors.main = savedColors.main;
            _params.colors.shadow = savedColors.shadow;
            _params.colors.background = savedColors.background;
            _params.colors.debug = savedColors.debug;
            _params.invertColors = wasInverted;
            changeCustomColorFields();
        };

    } catch (error) {
        console.error('Video encoder initialization failed:', error);
        alert('Video recording is not supported in your browser');
        _recording = false;
        _saveVideo = false;

        // Restore colors on error
        _params.colors = savedColors;
        _params.invertColors = wasInverted;
        changeCustomColorFields();
    }
}

function saveVIDEOupdate() {
    if (_recording) {
        if (!encoder && !_encoderInitializing) {
            _encoderInitializing = true;
            initMP4Encoder();
            return;
        }

        if (encoder && !_encoderInitializing) {
            _recordedFrames++;
            if (_recordedFrames >= _totalSaveFrames) {
                _stopRecording = true;
            }
        }
    }
}

function saveVIDEO() {
    if (_stopRecording || _recordedFrames > _totalSaveFrames) {
        console.log('recording is stopped');
        _stopRecording = false;
        _recording = false;
        _saveVideo = false;
        _recordedFrames = 0;

        encoder.onstop = () => {
            const blob = new Blob(chunks, {
                type: 'video/mp4'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = getSaveFilename() + '.mp4';
            a.click();
            URL.revokeObjectURL(url);

            // Restore colors using the stored function
            if (_restoreColors) {
                _restoreColors();
                _restoreColors = null;
            }

            encoderReset();
        };
        encoder.stop();
    }
}

function encoderReset(forceStop) {
    if (forceStop && encoder && encoder.state === 'recording') {
        encoder.stop();
    }
    encoder = null;
    chunks = [];
    _saveVideoSketch.preload();
}

let videoSketch = function (p) {
    let canvas;
    //————————————————————————————————————————————— setup
    p.setup = function () {
        canvas = p.createCanvas(_params.width * _sclGrfc, _params.height * _sclGrfc);
        _videoCanvas = canvas;

        // attach to the id
        const parent = document.getElementById('myCanvas');
        const child = canvas.canvas;
        parent.appendChild(child);
        $(child).css('display', 'none');

        p.pixelDensity(1);
        p.noSmooth();
    }

    p.preload = function () {
        encoder = null;
    }

    p.drawSketch = function () {
        p.clear();
        p.background(_params.colors.background);

        // Add signature pixel
        drawSignature(p)

        p.image(_saveCanvas, 0, 0);

        // Add signature pixel
        p.loadPixels();
        p.set(10, 10, p.color(0, 0, 255)); // Blue pixel at 10,10
        p.updatePixels();

        saveVIDEOupdate();
        saveVIDEO();
    }
}

function showVIDEOupdate() {
    if (_recording) {
        const size = _params.width / 20
        push()
        noStroke()
        fill(_params.colors.background)
        rectMode(CENTER)
        rect(width / 2, height / 2, _params.width, size * 2)
        textAlign(CENTER, CENTER)
        fill(_params.colors.main)
        textSize(size)
        text(`recording ${_recordedFrames} / ${_totalSaveFrames}`, width / 2, height / 2)
        pop()
    }
}