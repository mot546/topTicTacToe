import makePlayer from './player.js';

export const gameBoard = {
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
};

gameBoard.makePlayer = function(name1, symbol1, name2, symbol2){
    this.player1 = makePlayer(name1, symbol1);
    this.player2 = makePlayer(name2, symbol2);
 };
