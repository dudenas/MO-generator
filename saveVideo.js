let _saveSketch
let _saveVideoSketch
let _saveVideo = false
let _videoCanvas = null
let _recordedFrames = 0
let _totalSaveFrames = 0
let _recording = false
let _stopRecording = false

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
        // encoder.addFrameRgba(_videoCanvas.getImageData(0, 0, encoder.width, encoder.height).data);
        const imageData = _videoCanvas.getImageData(0, 0, encoder.width, encoder.height);
        const clampedArray = imageData.data;

        // Convert Uint8ClampedArray to Uint8Array
        const data = new Uint8Array(clampedArray.buffer);
        // console.log(data)

        // Add the frame to the encoder
        encoder.addFrameRgba(data);

        _recordedFrames++
    }
}

function saveVIDEO() {
    if (_stopRecording || _recordedFrames > _totalSaveFrames) {
        console.log('recording is stopped')
        _stopRecording = false
        _recording = false
        _saveVideo = false
        _recordedFrames = 0
        // console.log('recording stopped')

        encoder.finalize()
        const uint8Array = encoder.FS.readFile(encoder.outputFilename);
        const anchor = document.createElement('a')
        anchor.href = URL.createObjectURL(new Blob([uint8Array], {
            type: 'video/mp4'
        }))

        anchor.download = encoder.outputFilename
        anchor.click()
        encoderReset()
    }
}

function encoderReset(forceStop) {
    if (forceStop) encoder.finalize()
    encoder.delete()
    _saveVideoSketch.preload() // reinitialize encoder
}

//———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
let videoSketch = function (p) {
    let canvas
    //————————————————————————————————————————————— setup
    p.setup = function () {
        canvas = p.createCanvas(_params.width * _sclGrfc, _params.height * _sclGrfc)
        _videoCanvas = canvas.drawingContext

        // attach to the id
        const parent = document.getElementById('myCanvas')
        const child = canvas.canvas
        parent.appendChild(child);
        $(child).css('display', 'none')

        p.pixelDensity(1)
        p.noSmooth()
    }

    p.preload = function () {
        HME.createH264MP4Encoder().then(enc => {
            encoder = enc
            encoder.outputFilename = getSaveFilename()
            encoder.width = _params.width * _sclGrfc
            encoder.height = _params.height * _sclGrfc
            encoder.frameRate = 30
            // encoder.kbps = 10000000 // video quality
            encoder.groupOfPictures = 1 // lower if you have fast actions.
            // encoder.speed = 0 // 0 is best quality, 8 is best speed
            encoder.quantizationParameter = 10 // lower is better quality
            encoder.initialize()
        })
    }

    p.drawSketch = function () {
        _videoCanvas = canvas.drawingContext
        p.clear()
        p.background(_params.colors.background);
        p.image(_saveCanvas, 0, 0)


        saveVIDEOupdate()
        saveVIDEO()
    }
}