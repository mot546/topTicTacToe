import {gameLogic} from './gameLogic.js';
import {gameBoard} from './gameBoard.js';
export {gameBoard, gameController};

const gameController = gameLogic;
export default function(){
    
    function placesScore(){    
        const player1Score = document.querySelector(".score1");
        const player2Score = document.querySelector(".score2");
        
        player1Score.textContent = gameBoard.player1.getScore();
        player2Score.textContent = gameBoard.player2.getScore();
    };

    function placeNames(){
    const player1H1 = document.querySelector(".player1-title");
    const player2H1 = document.querySelector(".player2-title");

    player1H1.textContent = gameBoard.player1.name;
    player2H1.textContent = gameBoard.player2.name;
  };

    function clearDom(){
    const cells = document.querySelectorAll(".cells");
    cells.forEach(cell => {
        cell.textContent = "";
    });
}; 
    function welcome(){
        const body = document.querySelector("main");
        const welcome= document.querySelector(".welcome");
        body.classList.add("body-welcome");
        const playButton = document.querySelector(".play-button");
    
    playButton.addEventListener('click',function(){ 
        const player1Element = document.getElementById("player1");
        const player2Element = document.getElementById("player2");
        gameBoard.makePlayer(player1Element.value, 'X', player2Element.value, 'O');
        
        body.classList.remove("body-welcome");
        welcome.classList.add("hide-welcome");
        placeNames();

    });
    
    };
    return {placesScore, placeNames, clearDom, welcome};
}