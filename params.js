let _params = {
    width: 1920,
    height: 1080,
    tempWidth: 1920,
    tempHeight: 1080,

    frameRate: 30,

    colors: {
        background: "#000",
        main: "#fff",
        shadow: "#36454F",
        debug: "#ff0000",
        sub: [255, 0, 85]
    },

    strokeWeight: 2,

    debug: false,

    // graphics
    rectAmount: 7,
    boundariesMinFactor: .3,
    boundariesMaxFactor: 1.,
    boundariesMin: 40,
    boundariesMax: 200,
    flunctiotion: 1.,
    ySymetry: 0.1,
    selectedLine: null,
    selectedRect: null,
    graphicsHorizontal: true,

    // animation
    runAnimation: false,
    animationWithin: true,
    flunctiotionNatural: true,
    animationFrames: 30,
    animationIndex: 0,
    totalAnimationStages: 3,
};

let _sclGrfc = 1