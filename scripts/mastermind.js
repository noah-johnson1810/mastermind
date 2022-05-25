const block1 = document.getElementById('colorBlock1');
const block2 = document.getElementById('colorBlock2');
const block3 = document.getElementById('colorBlock3');
const block4 = document.getElementById('colorBlock4');
const block5 = document.getElementById('colorBlock5');
const block6 = document.getElementById('colorBlock6');

const restartBlock1 = document.getElementById('winGameBlock');
const restartBlock2 = document.getElementById('startBlock2');
const restartBlock3 = document.getElementById('startBlock3');
const DIFFICULTY = {
    EASY: 11,
    MEDIUM: 9,
    HARD: 7
}

setInterval(flashText, 1500);

startGame();

function startGame() {

    let rowNum = DIFFICULTY.EASY;
    let difficultyLevel = getCookie('difficulty');
    if (difficultyLevel === 'medium') {
        rowNum = DIFFICULTY.MEDIUM;
    }
    if (difficultyLevel === 'hard') {
        rowNum = DIFFICULTY.HARD;
    }

    createBoard(rowNum);

    let boardColors = {
        color1: '', color2: '', color3: '', color4: '', color5: '', color6: ''
    };
    let acceptableColors = true;
    do {
        acceptableColors = createColors(boardColors);
    }

    while (!acceptableColors);
    let solutionColors = {
        color1: '', color2: '', color3: '', color4: ''
    };
    createSolution(solutionColors, boardColors);

    let position = {
        currentCircle: 1,
        currentRow: rowNum
    };

    block1.addEventListener('click', function () {
        colorClickHandler(boardColors.color1, position, solutionColors, boardColors);
    })
    block2.addEventListener('click', function () {
        colorClickHandler(boardColors.color2, position, solutionColors, boardColors);
    })
    block3.addEventListener('click', function () {
        colorClickHandler(boardColors.color3, position, solutionColors, boardColors);
    })
    block4.addEventListener('click', function () {
        colorClickHandler(boardColors.color4, position, solutionColors, boardColors);
    })
    block5.addEventListener('click', function () {
        colorClickHandler(boardColors.color5, position, solutionColors, boardColors);
    })
    block6.addEventListener('click', function () {
        colorClickHandler(boardColors.color6, position, solutionColors, boardColors);
    })

}

restartBlock1.addEventListener('click', function () {
    location.replace('index.html');
})
restartBlock2.addEventListener('click', function () {
    location.replace('index.html');
})
restartBlock3.addEventListener('click', function () {
    location.reload(true);
})

