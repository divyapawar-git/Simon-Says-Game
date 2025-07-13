let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// game will start by entering the key once
function startGame() {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
}
// For desktop
document.addEventListener("keypress", startGame);
// For mobile (touch/click anywhere on screen)
document.addEventListener("touchstart", startGame);
document.addEventListener("click", startGame);


// flashing of the button by system
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

// flashing of the button by user
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

// altering h2 heading with levels and generating random colors for flashing
function levelUp() {
    userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randbtn);

}

// checking if userseq=gameseq
function checkAns(idx){
    if (userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
           setTimeout(levelUp, 1000);
        }
    }
    else{
        if(level>highScore){
            highScore=level;
            localStorage.setItem("highScore", highScore);
            document.getElementById("highscore").innerText = `High Score : ${highScore}`;
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        reset();
    }

}

// flash on clicking every btn
function btnPress() {
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

// to restart game
function reset(){
    started  = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highscore").innerText = `High Score : ${highScore}`;