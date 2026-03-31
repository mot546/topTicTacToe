import {gameBoard} from './gameBoard.js';
import dom from './dom.js';

const domController = dom();

let gameController = {
  xOrO: "",
  numberOfTurn: 0,
  whoWon: "",
  alreadyPlace: false,
  winningList : [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
    ],
};

gameController.winnerCheck = function(){
    
    for(let i=0; i < this.winningList.length; i++){
      let toCheck = "";
      let winnerName;
      for (const cellNo of this.winningList[i]){
        toCheck += gameBoard.board[cellNo-1];
      }
      if(toCheck.split('').every(char => char === toCheck[0])){
        this.whoWon = toCheck[0];
        if(gameBoard.player2.symbol  == this.whoWon){
          winnerName = gameBoard.player2.name;
          gameBoard.player2.addScore();
        }
        else{
          winnerName = gameBoard.player1.name;
          gameBoard.player1.addScore();
        }
       
        this.endGame(winnerName);
      }
    }
  }

gameController.endGame = function (winnerName){
  gameBoard.resetBoard();
  this.numberOfTurn = 0;
  this.whoWon = "";
  const playOrNot = document.querySelector(".play-or-reset");
  playOrNot.classList.remove("hide");

  const playAgainButton = document.querySelector(".play-again-button");
  const resetButton = document.querySelector(".reset-button");
  const winnerh1 = document.querySelector(".winner");
  winnerh1.textContent = winnerName + " win!";

  playAgainButton.addEventListener('click',()=>{
    domController.placesScore();
    domController.clearDom();
    playOrNot.classList.add("hide");
  });
  resetButton.addEventListener('click', ()=>{
    window.location.reload();
  });
}

export {gameController as gameLogic};