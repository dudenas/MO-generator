let _params = {
    width: 300,
    height: 800,

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
    rectAmount: 10,
    boundariesMinFactor: .2,
    boundariesMaxFactor: 1.,
    boundariesMin: 40,
    boundariesMax: 200,
    flunctiotion: 1.,
    ySymetry: 0.2,
    selectedLine: null,
    selectedRect: null,
    graphicsHorizontal: true,

    // animation
    runAnimation: false,
    animationWithin: false,
    flunctiotionNatural: true,
    animationFrames: 30,
    animationIndex: 0,
    totalAnimationStages: 6,
};

let _sclGrfc = 1