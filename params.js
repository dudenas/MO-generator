let _params = {
    width: 800,
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
    boundariesMin: 50,
    boundariesMax: 200,
    flunctiotion: 1.,
    ySymetry: 0.2,
    selectedLine: null,
    selectedRect: null,

    // animation
    runAnimation: true,
    animationFrames: 30,
    animationIndex: 0,
    totalAnimationStages: 6,
};

let _sclGrfc = 1