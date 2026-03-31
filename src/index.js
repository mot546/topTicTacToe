import dom, { gameController, gameBoard } from './dom.js';
import './styles.css'; 

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

const domController = dom();
const playGame = play();

domController.welcome();

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