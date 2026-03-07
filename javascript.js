const gameBoard = [
    board = [
      "","","",
      "","","",
      "","",""],
  ];
  
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
  
  gameBoard.push(player1);
  gameBoard.push(player2);
} )();

function placeSymbol(symbol){
  console.table()
}
