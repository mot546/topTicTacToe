
const gameBoard = {
    board: [
      "1","2","3",
      "4","5","6",
      "7","8","9"],
  };
gameBoard.resetBoard =function(){
  this.board= [
      "1","2","3",
      "4","5","6",
      "7","8","9",
    ];

}

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
        if(this.player2.symbol  == this.whoWon){
          winnerName = this.player2.name;
          this.player2.addScore();
        }
        else{
          winnerName = this.player1.name;
          this.player1.addScore();
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
    this.placeScores();
    this.clearDom();
    playOrNot.classList.add("hide");
  });
  resetButton.addEventListener('click', ()=>{
    window.location.reload();
  });


  
}

gameController.clearDom = function(){
  const cells = document.querySelectorAll(".cells");
  cells.forEach(cell => {
    cell.textContent = "";
  });
  
}

gameController.placeNames = function(){
  const player1H1 = document.querySelector(".player1-title");
  const player2H1 = document.querySelector(".player2-title");

  player1H1.textContent = this.player1.name;
  player2H1.textContent = this.player2.name;
}

gameController.placeScores = function(){
  const player1Score = document.querySelector(".score1");
  const player2Score = document.querySelector(".score2");
  
  player1Score.textContent = this.player1.getScore();
  player2Score.textContent = this.player2.getScore();
}

Object.setPrototypeOf(gameController, gameBoard);
 
function makePlayer(name, symbol){
   let score = 0;
   console.log("creating player");
   
   const addScore = function(){
     return score += 1;
   }
   const getScore = () => score;
   
   const resetScore = () => score = 0;
   
   return {name, symbol, addScore, getScore, resetScore};
 };
  
(function welcome(){
    const body = document.querySelector("main");
  const welcome= document.querySelector(".welcome");
  body.classList.add("body-welcome");
  const playButton = document.querySelector(".play-button");

  
  playButton.addEventListener('click',function(){ 
    const player1Element = document.getElementById("player1");
   const player2Element = document.getElementById("player2");
   gameBoard.player1 = makePlayer(player1Element.value, "X");
   gameBoard.player2 = makePlayer(player2Element.value, "O");
    body.classList.remove("body-welcome");
    welcome.classList.add("hide-welcome");
    gameController.placeNames();

  });
  
  
} )();

function play(){
  
  function beforePlaceSymbol(cell){
    
      if(gameController.whoWon == ""){
        gameController.numberOfTurn%2 ===0?gameController.xOrO = gameBoard.player1.symbol:gameController.xOrO = gameBoard.player2.symbol;
        placeSymbol(gameController.xOrO, cell);
       
      }else{
        
        gameController.numberOfTurn = 0;
      }
      if(gameController.numberOfTurn === 9 && gameController.whoWon == ""){
        gameController.endGame('Both of you did not ');
      };
   
  }
  
  function placeSymbol(symbol,cell){
    let cellInBoard = gameBoard.board[cell-1];
   if (cellInBoard=="X" || cellInBoard=="O"){
    gameController.alreadyPlace = true;
  }else{
      gameBoard.board[cell - 1] = symbol;
     gameController.numberOfTurn++;
   }
   
  }
    
  
  return {beforePlaceSymbol};
}


const playGame = play();
const cells = document.querySelectorAll(".cells");
cells.forEach(cell => {
  cell.addEventListener('click', function(){
    playGame.beforePlaceSymbol(cell.id);
    if(gameController.alreadyPlace === false){
      cell.textContent = gameController.xOrO;
    }else{

      gameController.alreadyPlace = false;
    }
    
    gameController.winnerCheck();
  });
});