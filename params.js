let _params = {
    width: 1920,
    height: 1080,
    tempWidth: 1920,
    tempHeight: 1080,

    frameRate: 30,

    // colors: {
    //     background: "#000",
    //     shadow: [255, 0, 0, 255],
    //     main: [255, 0, 0, 255],
    //     debug: "#ffffff",
    //     sub: [255, 0, 85]
    // },
    colors: {
        background: "#000000",
        shadow: "#000000",
        main: "#000000",
        debug: "#000000",
    },

    invertColors: false,

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
    runAnimation: true,
    animationWithin: true,
    flunctiotionNatural: true,
    animationFrames: 30,
    animationIndex: 0,
    totalAnimationStages: 3,
};

let _sclGrfc = 1