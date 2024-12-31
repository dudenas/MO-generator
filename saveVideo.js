let _saveSketch
let _saveVideoSketch
let _saveVideo = false
let _videoCanvas = null
let _recordedFrames = 0
let _totalSaveFrames = 0
let _recording = false
let _stopRecording = false
let _videoFormat = 'mp4' // Default format
let _encoderInitializing = false

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

function saveVIDEOupdate() {
    if (_recording) {
        if (!encoder && !_encoderInitializing) {
            // Initialize encoder based on format
            if (_videoFormat === 'mp4') {
                _encoderInitializing = true;
                initMP4Encoder()
                    .then(() => {
                        _encoderInitializing = false;
                    })
                    .catch(error => {
                        console.error('Error during MP4 encoder initialization:', error);
                        _encoderInitializing = false;
                        _videoFormat = 'webm';
                        initWebMEncoder();
                    });
                return;
            } else {
                initWebMEncoder();
            }
        }

        if (encoder && !_encoderInitializing) {
            // Add frame based on format
            if (_videoFormat === 'mp4') {
                const imageData = _videoCanvas.getImageData(0, 0, encoder.width, encoder.height);
                const clampedArray = imageData.data;

                // Create a new array with gamma correction
                const data = new Uint8Array(clampedArray.length);
                for (let i = 0; i < clampedArray.length; i += 4) {
                    // Apply gamma correction (gamma = 1.1)
                    data[i] = Math.pow(clampedArray[i] / 255, 1.1) * 255; // R
                    data[i + 1] = Math.pow(clampedArray[i + 1] / 255, 1.1) * 255; // G
                    data[i + 2] = Math.pow(clampedArray[i + 2] / 255, 1.1) * 255; // B
                    data[i + 3] = 255; // A (full opacity)
                }

                encoder.addFrameRgba(data);
            } else {
                encoder.addFrame(_videoCanvas.canvas);
            }
            _recordedFrames++;
        }
    }
}

async function initMP4Encoder() {
    try {
        encoder = await HME.createH264MP4Encoder();
        encoder.outputFilename = getSaveFilename();
        encoder.width = _params.width * _sclGrfc;
        encoder.height = _params.height * _sclGrfc;
        encoder.frameRate = 30;
        encoder.groupOfPictures = 1; // Back to 1 for better quality
        encoder.quantizationParameter = 10; // Lower for better quality
        encoder.speed = 0; // Best quality
        encoder.kbps = 150000; // Even higher bitrate
        await encoder.initialize();
    } catch (error) {
        console.error('MP4 encoder initialization failed:', error);
        _videoFormat = 'webm';
        initWebMEncoder();
    }
}

function initWebMEncoder() {
    encoder = new WebMWriter({
        quality: 1.,
        frameRate: 30,
        width: _params.width * _sclGrfc,
        height: _params.height * _sclGrfc
    });
}

function saveVIDEO() {
    if (_stopRecording || _recordedFrames > _totalSaveFrames) {
        console.log('recording is stopped');
        _stopRecording = false;
        _recording = false;
        _saveVideo = false;
        _recordedFrames = 0;

        if (_videoFormat === 'mp4') {
            encoder.finalize();
            const uint8Array = encoder.FS.readFile(encoder.outputFilename);
            const anchor = document.createElement('a');
            anchor.href = URL.createObjectURL(new Blob([uint8Array], {
                type: 'video/mp4'
            }));
            anchor.download = encoder.outputFilename;
            anchor.click();
            encoderReset();
        } else {
            encoder.complete().then(blob => {
                const anchor = document.createElement('a');
                anchor.href = URL.createObjectURL(blob);
                anchor.download = getSaveFilename() + '.webm';
                anchor.click();
                encoderReset();
            });
        }
    }
}

function encoderReset(forceStop) {
    if (forceStop) {
        if (_videoFormat === 'mp4') {
            encoder.finalize();
            encoder.delete();
        } else if (encoder) {
            encoder.complete();
        }
    }
    encoder = null;
    _saveVideoSketch.preload();
}

//———————————————————————————————————————————————————————————————————————————————————————
let videoSketch = function (p) {
    let canvas;
    //————————————————————————————————————————————— setup
    p.setup = function () {
        canvas = p.createCanvas(_params.width * _sclGrfc, _params.height * _sclGrfc);
        _videoCanvas = canvas.drawingContext; // For MP4
        if (_videoFormat === 'webm') {
            _videoCanvas = canvas; // For WebM
        }

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
        if (_videoFormat === 'mp4') {
            _videoCanvas = canvas.drawingContext;
        }
        p.clear();
        p.background(_params.colors.background);
        p.image(_saveCanvas, 0, 0);

        saveVIDEOupdate();
        saveVIDEO();
    }
}