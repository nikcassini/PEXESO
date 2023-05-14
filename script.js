gameButtons = document.getElementsByClassName("gameBtn");
gameButtonsImg = document.getElementsByClassName("gameBtnImg");

let gameOverModal;
var gameOverText;
btnNewGame = document.getElementById("btnNewGame");
btnModalNewGame = document.getElementById("btnModalNewGame");

const imgsCount = 8;
let numbersArray = [];
let numbersArray2 = [];
for (let x = 0; x < imgsCount; x++) {
    numbersArray.push(x);
    numbersArray2.push(x);
}

let isBtnSelected = false;
let selectedBtn1 = "x";
let selectedBtn2 = "x";
let foundCount = 0;
let isClicked = false;

window.addEventListener('load', function() {
    gameOverModal = new bootstrap.Modal('#modalGameOver');
    gameOverText = document.getElementById("gameOverText");

    btnNewGame.addEventListener('click', function() { setup(); })
    btnModalNewGame.addEventListener('click', function() { setup(); })

    setup();
})

function setup() {
    numbersArray = [];
    numbersArray2 = [];
    for (let x = 0; x < imgsCount; x++) {
        numbersArray.push(x);
        numbersArray2.push(x);
    }
    
    isBtnSelected = false;
    selectedBtn1 = "x";
    selectedBtn2 = "x";
    foundCount = 0;
    isClicked = false;

    for (let i = 0; i < gameButtonsImg.length; i++) {
        let imgIndex = generateImg();
        gameButtonsImg[i].style.visibility = "hidden";
        gameButtonsImg[i].src = "imgs/" + imgIndex + ".png";

        gameButtons[i].style.backgroundColor = "white";
    
        gameButtons[i].addEventListener('click', function() {
            if (!isClicked) {
                if (isBtnSelected == false) {
                    isBtnSelected = true;
                    gameButtonsImg[i].style.visibility = "visible";
                    selectedBtn1 = i;
                }
                else if (isBtnSelected == true) {
                    if (i != selectedBtn1) {
                        gameButtonsImg[i].style.visibility = "visible";
                        selectedBtn2 = i;
                        isClicked = true;
                        setTimeout(function() {
                            if (gameButtonsImg[selectedBtn1].src == gameButtonsImg[selectedBtn2].src) {
                                foundCount++;
                                gameButtons[selectedBtn1].style.backgroundColor = "lightGreen";
                                gameButtons[selectedBtn2].style.backgroundColor = "lightGreen";
                                if (foundCount == 8) win();
                            }
                            else {
                                gameButtonsImg[selectedBtn1].style.visibility = "hidden";
                                gameButtonsImg[selectedBtn2].style.visibility = "hidden";
                            }
                            isBtnSelected = false;
                            isClicked = false;
                        }, 400);
                    }
                }
            }
        })
    }
}

function win() {
    gameOverModal = new bootstrap.Modal('#modalGameOver');
    gameOverText = document.getElementById("gameOverText");
    gameOverText.textContent = "You won!";
    gameOverModal.show();
}

function generateImg() {
    let randomIndex = Math.floor(Math.random() * 8);
    let found1 = false;
    let found2 = false;

    while (found1 != true && found2 != true) {
        for (let x = 0; x < imgsCount; x++) {
            if (randomIndex == numbersArray[x]) {
                found1 = true;
                numbersArray[x] = "x";
                break;
            }
        }
        if (found1 == false) {
            for (let y = 0; y < imgsCount; y++) {
                if (randomIndex == numbersArray2[y]) {
                    found2 = true;
                    numbersArray2[y] = "x";
                    break;
                }
            }
            if (found2 == false) {
                found1 = false;
                randomIndex = Math.floor(Math.random() * 8);
            }
        }
    }

    return randomIndex;
}