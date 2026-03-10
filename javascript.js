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
  
(function addPlayerToGameBoard(){
  let player1Name = prompt("Enter Player 1 Name: ");
  let player2Name = prompt("Enter Player 2 Name: ");

  const player1 = makePlayer(player1Name, "X");
  const player2 = makePlayer(player2Name, "O");
  
  gameBoard.player1 = player1;
  gameBoard.player2 = player2;
} )();

function play(){
  let winningList = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
    ];
  let whoWon = "";
  
  function beforePlaceSymbol(){

    function tie(){
      console.log("tie");
    }

    let numberOfTurn = 1;
    let bool = true;
    while(bool){
        if(numberOfTurn === 9){
          bool=false 
          tie();
        };
        if(whoWon == ""){
          numberOfTurn%2 ===0?placeSymbol(gameBoard.player1.symbol):placeSymbol(gameBoard.player2.symbol);
          numberOfTurn++;
          winnerCheck();
        }else{
          console.log(`${whoWon} won !`);
          bool = false;
        }
   }
  }
  
  function placeSymbol(symbol){
    console.table(gameBoard.board);
    let cell = prompt("Which cell to place?: ");
   if (cell=="X" || cell=="O"){
      console.log("already hss X or O");
      play();
   }else{
      gameBoard.board[cell - 1] = symbol;
   }
   
  }
    
  function winnerCheck(){
    
    for(let i=0; i < winningList.length; i++){
      let toCheck = "";
      for (const cellNo of winningList[i]){
        toCheck += gameBoard.board[cellNo-1];

      }
      if(toCheck.split('').every(char => char === toCheck[0])){
        console.log(toCheck, winningList[i].join(""));
        whoWon = toCheck[0];
      }
    }
  }

  return {beforePlaceSymbol};
}
  const playGame = play();
playGame.beforePlaceSymbol();
  
  