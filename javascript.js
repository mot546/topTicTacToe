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
  
function makePlayer(name, symbol){
   let score;
   
   const addScore = function(){
     return ++score;
   }
   const getScore = () => score;
   
   const resetScore = () => score = 0;
   
   return {name, symbol, addScore, getScore, resetScore};
 };
  
(function addPlayerToGameBoard(p1Name, p2Name){

  const player1 = makePlayer(p1Name, "X");
  const player2 = makePlayer(p2Name, "O");
  
  gameBoard.player1 = player1;
  gameBoard.player2 = player2;
} )();

function play(){
  
  function beforePlaceSymbol(cell){
    
      if(gameController.whoWon == ""){
        gameController.numberOfTurn%2 ===0?gameController.xOrO = gameBoard.player1.symbol:gameController.xOrO = gameBoard.player2.symbol;
        placeSymbol(gameController.xOrO, cell);
        gameController.numberOfTurn++;
      }else{
        console.log(`${gameController.whoWon} won !`);
        gameController.numberOfTurn = 0;
      }
      if(gameController.numberOfTurn === 9 && whoWon == ""){
        console.log("tie");
      };
   
  }
  
  function placeSymbol(symbol,cell){
    let cellInBoard = gameBoard.board[cell-1];
   if (cellInBoard=="X" || cellInBoard=="O"){
    console.log("already Place");
   }else{
      gameBoard.board[cell - 1] = symbol;
   }
   
  }
    
  
  return {beforePlaceSymbol};
}

const playGame = play();
let gameController = {
  xOrO: "",
  numberOfTurn: 0,
  whoWon: "",
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
      for (const cellNo of this.winningList[i]){
        toCheck += gameBoard.board[cellNo-1];
      }
      console.log(toCheck);
      if(toCheck.split('').every(char => char === toCheck[0])){
        console.log("wiinnnerr");
        this.whoWon = toCheck[0];
      }
    }
  }


const cells = document.querySelectorAll(".cells");
cells.forEach(cell => {
  cell.addEventListener('click', function(){
    playGame.beforePlaceSymbol(cell.id);
    cell.textContent = gameController.xOrO;
    gameController.winnerCheck();
  });
});