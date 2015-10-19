var weight = 0;
var bestIndex = null;

var computerMove =  function computerMove(index){
    cells[index].html('o');
    console.log(weight);
}
// best position for computer
var computerThink = function computerThink(){
    for(var i = 0; i < cells.length; i++){
        // loop through empty cells and try to find winning moves
            if(cells[i].html() === ''){
                cells[i].html('o');
                checkWin();
                if(gameover)
                {
                    cells[i].html('');
                    // winning move has weight of 1000
                    weight = 1000;
                    --p2Win;
                    return bestIndex = i;
                }
                else if(checkTie() && weight < 800){
                    cells[i].html('');
                    // tie move has weight of 100
                    weight = 100;
                    bestIndex = i;
                }
                else{
                    botTest = true;
                    cells[i].html('x');
                    checkWin();
                    if(gameover){
                        cells[i].html('');
                        weight = 800;
                        gameover = false;
                        botTest = false;
                        return bestIndex = i;
                    } else {
                    // generate random move with weight between 100 and 800
                    var emptyIndex = [];
                    for(var j = 0; j < cells.length; j++){
                        if(cells[j].html() === '') {
                            emptyIndex.push(j);
                        }
                    }
                    botTest = false;
                    cells[i].html('');
                    weight=Math.floor(Math.random()*700 ) + 100;
                    bestIndex = emptyIndex[Math.floor(Math.random()*emptyIndex.length)];
                    }
                }
            }
    }
    return bestIndex;
}
