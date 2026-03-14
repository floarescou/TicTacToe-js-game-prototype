
const modalWindows = document.querySelectorAll('.modal-overlay');
const modalCloseIcon = document.querySelectorAll('.modal-close');
const gameArea = document.querySelector('.game-area');
const gameCell = document.querySelectorAll('.game-area__cell');
const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart');
const gamerNamesDecor = document.querySelector('.modal-first-step__decor');
const playersNamesInputs = document.querySelectorAll('.modal-start__input');
const playersBlock = document.querySelector('.players');
const playerNameCell = document.querySelectorAll('.player');
const chooseThemeBlocks = document.querySelectorAll('.theme-block');
const modalStartBtn = document.querySelector('.modal-start-btn');
const startPlayer = document.querySelector('.modal-first-step-text');
let winnerName = document.querySelector('.modal-win-name');
let winnerDecor = document.querySelectorAll('.modal-win__decor');
const modalWinTheme = document.querySelector('.modal-win-theme');
const nowinPicsBlocks = document.querySelectorAll('.modal-nowin-theme--img');
let redDecorPics = [
    "url('img/modals/red-win-decor-left.png')",
    "url('img/modals/red-win-decor-right.png')"
];
let yellowDecorPics = [
    "url('img/modals/yellow-win-decor-left.png')",
    "url('img/modals/yellow-win-decor-right.png')"
];
let bugsTheme = [
    "url('./img/ladybug-yellow.png')",
    "url('./img/ladybug-red.png')"
];
let mushroomTheme = [
    "url('./img/mushroom-yellow.png')",
    "url('./img/mushroom-red.png')"
];
function defaultGameSettings() {
    gameArea.style.pointerEvents = 'none';
    recoloredAllCells('#827b72');
    startBtn.classList.add('animation-shadow');
}
defaultGameSettings();
for (let i = 0; i < modalCloseIcon.length; i++) {
    modalCloseIcon[i].onclick = () => {
        modalWindows[i].classList.add('none');
    };
}
modalCloseIcon[0].onclick = () => {
    modalWindows[0].classList.add('none');
    playersNamesInputs[0].value = '';
    playersNamesInputs[1].value = '';
    chooseThemeBlocks[0].classList.remove('gamer-theme');
    chooseThemeBlocks[1].classList.remove('gamer-theme');
    chooseThemeBlocks[0].style.backgroundColor = '#c4ad8f';
    chooseThemeBlocks[1].style.backgroundColor = '#c4ad8f';
};
function recoloredAllCells(item) {
    for (let i = 0; i < gameCell.length; i++) {
        gameCell[i].style.backgroundColor = item;
    }
}
function gameTheme(block, array, array2, index) {
    if (chooseThemeBlocks[0].classList.contains('gamer-theme')) {
        block.style.backgroundImage = array[index];
    } else if (chooseThemeBlocks[1].classList.contains('gamer-theme')) {
        block.style.backgroundImage = array2[index];
    }
}
function chooseTheme() {
    for (let i = 0; i < chooseThemeBlocks.length; i++) {
        chooseThemeBlocks[i].addEventListener('click', (event) => {
            let a = event.target;
            if (a.classList.contains("theme-bugs")) {
                chooseThemeBlocks[0].classList.add('gamer-theme');
                chooseThemeBlocks[0].style.backgroundColor = '#859666';
                chooseThemeBlocks[1].classList.remove('gamer-theme');
                chooseThemeBlocks[1].style.backgroundColor = '#C4AD8F';
            } else if (a.classList.contains("theme-mushrooms")) {
                chooseThemeBlocks[1].classList.add('gamer-theme');
                chooseThemeBlocks[1].style.backgroundColor = '#859666';
                chooseThemeBlocks[0].classList.remove('gamer-theme');
                chooseThemeBlocks[0].style.backgroundColor = '#C4AD8F';
            }
        })
    }
}
startBtn.addEventListener('click', () => {
    modalWindows[0].classList.remove('none');
    chooseTheme();
});
let success = 0;
for (let i = 0; i < playersNamesInputs.length; i++) {
    playersNamesInputs[i].addEventListener('input', function() {
        this.value = this.value.replace(/[^а-яА-Яa-zA-Z]/g, '');
    });
}
function checkStart() {
    const inactiveBg = document.querySelector('.inactive');
    for (let i = 0; i < playersNamesInputs.length; i++) {
        if (
            playersNamesInputs[0].value.length >= 2 && playersNamesInputs[1].value.length >= 2 &&
            chooseThemeBlocks[0].classList.contains('gamer-theme') || chooseThemeBlocks[1].classList.contains('gamer-theme') &&
            playersNamesInputs[0].value !== '' && playersNamesInputs[1].value !== ''
        ) {
            let name = playersNamesInputs[i].value;
            playerNameCell[i].textContent = name.charAt(0).toUpperCase() + name.slice(1);
            playersBlock.classList.remove('none');
            startBtn.classList.add('none');
            modalWindows[0].classList.add('none');
            inactiveBg.classList.add('none');
            success = 1;
        }
    }
}
modalStartBtn.addEventListener('click', (event) => {
    checkStart();
    if (success !== 1) {
        event.preventDefault();
    } else {
        playerNameCell[0].classList.add('game-move');
        setTimeout(() => {
            startPlayer.textContent = playerNameCell[0].textContent;
            gameTheme(gamerNamesDecor, bugsTheme, mushroomTheme, 1);
            modalWindows[1].classList.remove('none');
        }, 300);
        setTimeout(() => {
            modalWindows[1].classList.add('none');
            gameArea.style.pointerEvents = 'auto';
            recoloredAllCells('#B9905A');
        }, 2100);
    }
});
let currentGamer = playerNameCell[0];
let gamerSignArr = [];
let counter = 0;
function chooseCell() {
    for (let i = 0; i < gameCell.length; i++) {
        gameCell[i].addEventListener('click', () => {
            let gamerSign = document.createElement('div');
            gameCell[i].appendChild(gamerSign);
            gamerSign.style.display = 'block';
            gameCell[i].style.backgroundColor = '#D9AA6F';
            gameCell[i].style.pointerEvents = 'none';
            gamerSignArr.push(gamerSign);
            if (currentGamer === playerNameCell[0]) {
                currentGamer = playerNameCell[1];
                playerNameCell[0].classList.remove('game-move');
                playerNameCell[1].classList.add('game-move');
                gamerSign.classList.add('chip-cell');
                gameTheme(gamerSign, bugsTheme, mushroomTheme, 1);
                gameCell[i].classList.add('red');
                counter++;
            } else {
                currentGamer = playerNameCell[0];
                playerNameCell[0].classList.add('game-move');
                playerNameCell[1].classList.remove('game-move');
                gamerSign.classList.add('chip-cell');
                gameTheme(gamerSign, bugsTheme, mushroomTheme, 0);
                gameCell[i].classList.add('yellow');
                counter++;
            }
            checkWin();
        })
    }
}
chooseCell();
const winCombs = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
function addDecorPics(item, arr) {
    for (let j = 0; j < item.length; j++) {
        item[j].style.backgroundImage = arr[j];
    }
}
function checkWin() {
    let res;
    for (let i = 0; i < winCombs.length; i++) {
        let oneComb = winCombs[i];
        function coloredCells() {
            for (let j = 0; j < oneComb.length; j++) {
                gameCell[oneComb[j]].style.backgroundColor = '#859666';
            }
        }
        function newGame() {
            restartBtn.classList.remove('none');
            gameArea.style.pointerEvents = 'none';
        }
        if (gameCell[oneComb[0]].classList.contains('red') && gameCell[oneComb[1]].classList.contains('red') && gameCell[oneComb[2]].classList.contains('red')) {
            newGame();
            coloredCells();
            addDecorPics(winnerDecor, redDecorPics);
            gameTheme(modalWinTheme, bugsTheme, mushroomTheme, 1);
            winnerName.textContent = playerNameCell[0].innerHTML;
            modalWindows[2].classList.remove('none');
            res = "red";
        }
        if (gameCell[oneComb[0]].classList.contains('yellow') && gameCell[oneComb[1]].classList.contains('yellow') && gameCell[oneComb[2]].classList.contains('yellow')) {
            newGame();
            coloredCells();
            addDecorPics(winnerDecor, yellowDecorPics);
            gameTheme(modalWinTheme, bugsTheme, mushroomTheme, 0);
            winnerName.textContent = playerNameCell[1].innerHTML;
            modalWindows[2].classList.remove('none');
            res = 'yellow';
        }
    }
    if (res !== "red" && res !== 'yellow') {
        if (counter >= 9) {
            newGame();
            recoloredAllCells('#859666');
            noWinDecor();
            modalWindows[3].classList.remove('none');
        }
    }
}
function noWinDecor() {
    if (chooseThemeBlocks[0].classList.contains('gamer-theme')) {
        addDecorPics(nowinPicsBlocks, bugsTheme);
    } else if (chooseThemeBlocks[1].classList.contains('gamer-theme')) {
        addDecorPics(nowinPicsBlocks, mushroomTheme);
    }
}
restartBtn.onclick = () => {
    for (let i = 0; i < 9; i++) {
        gameCell[i].classList.remove('red', 'yellow');
        gameCell[i].style.pointerEvents = 'auto';
        gameCell[i].style.backgroundColor = '#B9905A';
        counter = 0;
    }
    gamerSignArr.forEach((item) => {
        item.remove();
    });
    startPlayer.textContent = currentGamer.textContent;
    if (currentGamer === playerNameCell[0]) {
        gameTheme(gamerNamesDecor, bugsTheme, mushroomTheme, 1);
    } else if (currentGamer === playerNameCell[1]) {
        gameTheme(gamerNamesDecor, bugsTheme, mushroomTheme, 0);
    }
    modalWindows[1].classList.remove('none');
    setTimeout(() => {
        modalWindows[1].classList.add('none');
    }, 1500);
};