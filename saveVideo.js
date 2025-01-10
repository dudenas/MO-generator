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

function initMP4Encoder() {
    try {
        chunks = [];
        const stream = _videoCanvas.canvas.captureStream(60);

        // Prioritize high-quality codecs first
        const mimeTypes = [
            'video/mp4;codecs=h264', // High quality H.264
            'video/mp4;codecs=avc1.42E01E,mp4a.40.2', // Standard H.264
            'video/mp4;codecs=avc1.64001F', // Fallback H.264
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
            videoBitsPerSecond: 500000000, // 500 Mbps for much higher quality
            frameRate: 30
        });

        encoder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        encoder.start(1000 / 30); // Keep 30fps timing
        _encoderInitializing = false;
    } catch (error) {
        console.error('Video encoder initialization failed:', error);
        alert('Video recording is not supported in your browser');
        _recording = false;
        _saveVideo = false;
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
        p.image(_saveCanvas, 0, 0);

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