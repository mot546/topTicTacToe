export default function (name, symbol){
   let score = 0;
   console.log("creating player"); 
   
   const addScore = function(){
     return score += 1;
   }
   const getScore = () => score;
   
   const resetScore = () => score = 0;
   
   return {name, symbol, addScore, getScore, resetScore};
 };