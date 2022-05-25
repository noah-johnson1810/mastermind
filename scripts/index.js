const startBlock1 = document.getElementById('startBlock');
const difficultyBlockEasy = document.getElementById('easy');
const difficultyBlockMedium = document.getElementById('medium');
const difficultyBlockHard = document.getElementById('hard');

const selectedMenuColor = 'rgb(212, 212, 212)';
const selectedFontColor = '#333';

const nonSelectedMenuColor = '#333';
const nonSelectedFontColor = '#c2c2c2';



document.cookie = 'difficulty=easy';

startBlock1.addEventListener('click', function () {
    location.replace('mastermind.html');
})

difficultyBlockEasy.addEventListener('click', function() {
    document.getElementById('easy').style.backgroundColor = selectedMenuColor;
    document.getElementById('easy').style.color = selectedFontColor;

    document.getElementById('medium').style.backgroundColor = nonSelectedMenuColor;
    document.getElementById('medium').style.color = nonSelectedFontColor;

    document.getElementById('hard').style.backgroundColor = nonSelectedMenuColor;
    document.getElementById('hard').style.color = nonSelectedFontColor;

    document.cookie = 'difficulty=easy;';
})

difficultyBlockMedium.addEventListener('click', function() {
    document.getElementById('medium').style.backgroundColor = selectedMenuColor;
    document.getElementById('medium').style.color = selectedFontColor;

    document.getElementById('easy').style.backgroundColor = nonSelectedMenuColor;
    document.getElementById('easy').style.color = nonSelectedFontColor;

    document.getElementById('hard').style.backgroundColor = nonSelectedMenuColor;
    document.getElementById('hard').style.color = nonSelectedFontColor;

    document.cookie = 'difficulty=medium;';
})

difficultyBlockHard.addEventListener('click', function() {
    document.getElementById('hard').style.backgroundColor = selectedMenuColor;
    document.getElementById('hard').style.color = selectedFontColor;

    document.getElementById('medium').style.backgroundColor = nonSelectedMenuColor;
    document.getElementById('medium').style.color = nonSelectedFontColor;

    document.getElementById('easy').style.backgroundColor = nonSelectedMenuColor;
    document.getElementById('easy').style.color = nonSelectedFontColor;

    document.cookie = 'difficulty=hard;';
})