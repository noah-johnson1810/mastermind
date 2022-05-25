'use strict';

const RGB_MAX = 255;
const COLUMNS = 4;
const DEFAULT_COLOR = '#6e9b9b';
const STRONG_CORRECT = 'black';
const WEAK_CORRECT = 'white';
const NUM_RGB = 3;
const MINIMUM_DISTANCE = 100;

let userColors = {
    color1: '', color2: '', color3: '', color4: ''
}

function changeColor(rowNo, circleNo, newColor) {
    document.getElementById(`boardRow${rowNo}Col${circleNo}`).style.backgroundColor = newColor;
}

function changeColorTemp(circleNo, newColor) {
    document.getElementById(`tempCircle${circleNo}`).style.backgroundColor = newColor;
}

function changeGradientColor(index, color) {
    let r = document.querySelector(':root');
    r.style.setProperty(`--gradientColor${index}`, color);
}


function checkColorSimilarity(boardColorArray) {
    let numBlocks = boardColorArray.length;

    for (let index = 0; index < numBlocks - 1; index++) {
        for (let index2 = index + 1; index2 < numBlocks; index2++) {
            if (Math.abs(boardColorArray[index].red - boardColorArray[index2].red) < MINIMUM_DISTANCE &&
                Math.abs(boardColorArray[index].green - boardColorArray[index2].green) < MINIMUM_DISTANCE &&
                Math.abs(boardColorArray[index].blue - boardColorArray[index2].blue) < MINIMUM_DISTANCE) {
                return false;
            }
        }
    }
    return true;
}

function checkGameCompletion(row, lastEntry) {
    if (row === 1) {
        location.replace('lose.html');
    }
}

function checkSolution(solutionColors, userColors, row, boardColors) {
    let dots = {
        weak: 0,
        strong: 0
    }

    Object.keys(boardColors).forEach(key => {
        let currentColor = boardColors[key];
        checkOneColor(currentColor, solutionColors, userColors, dots);
    })

    for (let i = 1; i <= dots.strong; i++) {
        document.getElementById(`responseAreaRow${row}Col${i}`).style.backgroundColor = STRONG_CORRECT;
    }
    for (let i = 1; i <= dots.weak; i++) {
        document.getElementById(`responseAreaRow${row}Col${dots.strong + i}`).style.backgroundColor = WEAK_CORRECT;
    }
    if (dots.strong === COLUMNS) {
        document.getElementById('winGameBlock').style.visibility = 'visible';
    }
}

function checkOneColor(checkColor, solutionColors, userColors, dots) {
    let userColorOccurences = 0;
    let solutionColorOccurences = 0;
    let newStrongDots = 0;

    Object.keys(userColors).forEach(key => {
        if (userColors[key] === checkColor) {
            userColorOccurences++;
        }
    })

    Object.keys(solutionColors).forEach(key => {
        if (solutionColors[key] === checkColor) {
            solutionColorOccurences++;
        }
    })

    if (userColorOccurences != 0 && solutionColorOccurences != 0) {
        Object.keys(userColors).forEach(key => {
            if (userColors[key] === checkColor && solutionColors[key] === checkColor) {
                newStrongDots++;
            }
        })

        dots.strong += newStrongDots;

        for (let i = newStrongDots; i < solutionColorOccurences; i++) {
            if (i < userColorOccurences) {
                dots.weak++;
            }
        }
    }
}

function createBoard(rows) {
    for (let currentRow = 1; currentRow <= rows; currentRow++) {
        for (let currentColumn = 1; currentColumn <= COLUMNS; currentColumn++) {
            const createCircle = document.createElement('div');
            createCircle.classList.add('largeCircle');
            createCircle.id = `boardRow${currentRow}Col${currentColumn}`;
            const board = document.getElementById('board');
            board.appendChild(createCircle);
        }
    }

    for (let currentRow = 1; currentRow <= rows; currentRow++) {
        for (let currentColumn = 1; currentColumn <= COLUMNS; currentColumn++) {
            const createSmallCircle = document.createElement('div');
            createSmallCircle.classList.add('smallCircle');
            createSmallCircle.id = `responseAreaRow${currentRow}Col${currentColumn}`;
            const responseArea = document.getElementById('responseArea');
            responseArea.appendChild(createSmallCircle);
        }
    }
}

function createColors(boardColors) {
    let boardColorArray = new Array();
    let blockNo = 1;

    Object.keys(boardColors).forEach(key => {
        let currentColorBlock = {
            red: Math.floor(Math.random() * RGB_MAX),
            green: Math.floor(Math.random() * RGB_MAX),
            blue: Math.floor(Math.random() * RGB_MAX)
        };

        boardColors[key] = `rgb(${currentColorBlock.red}, ${currentColorBlock.green}, ${currentColorBlock.blue})`;

        changeGradientColor(blockNo, boardColors[key]);
        setCurrentColorBlock(blockNo, boardColors[key]);
        boardColorArray.push(currentColorBlock);

        blockNo++;
    })

    return checkColorSimilarity(boardColorArray);
}

function createSolution(solutionColors, boardColors) {

    /* Use for testing: solution = 1, 1, 2, 2 */
    //solutionColors.color1 = boardColors.color1;
    //solutionColors.color2 = boardColors.color1;
    //solutionColors.color3 = boardColors.color2;
    //solutionColors.color4 = boardColors.color2;

     /*Use for deployment: solution = random */
     Object.keys(solutionColors).forEach(key => {
         let index = Math.floor(Math.random() * 6 + 1);
         let indexString = `color${index}`;
         solutionColors[key] = boardColors[indexString];
    })
}

function colorClickHandler(color, position, solution, boardColors) {
    document.getElementById(`tempCircle${position.currentCircle}`).style.backgroundColor = color;
    userColors[`color${position.currentCircle}`] = color;

    if (position.currentCircle === COLUMNS) {
        moveColors(position.currentRow, userColors);
        checkSolution(solution, userColors, position.currentRow, boardColors);
        checkGameCompletion(position.currentRow, userColors);
        position.currentCircle = 1;
        position.currentRow--;
    }
    else {
        position.currentCircle++;
    }
}

/* The following function is from w3schools.com.    *
 * URL: https://www.w3schools.com/js/js_cookies.asp */

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function moveColors(rowNo, userColors) {
    let index = 1;
    Object.keys(userColors).forEach(key => {
        let currentColor = userColors[key];
        changeColor(rowNo, index, currentColor);
        changeColorTemp(index, DEFAULT_COLOR);
        index++;
    })
}

function setCurrentColorBlock(blockNo, color) {
    document.getElementById(`colorBlock${blockNo}`).style.backgroundColor = color;
}

function flashText() {
    let lightFlashColor = 'var(--titleColor1)';
    let darkFlashColor = 'var(--titleColor2)';

    if (document.getElementById('titleText').style.color === lightFlashColor) {
        document.getElementById('titleText').style.color = darkFlashColor;
    }
    else {
        document.getElementById('titleText').style.color = lightFlashColor;
    }
    if (document.getElementById('titleText2').style.color === darkFlashColor) {
        document.getElementById('titleText2').style.color = lightFlashColor;
    }
    else {
        document.getElementById('titleText2').style.color = darkFlashColor;
    }
}