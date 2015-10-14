var weight = 0;
//function computerThink(){  
//    var ai = best();
//    var x = ai.x;  
//    var y = ai.y;  
//    board[x][y] = 1;  
//    step++;  
//    downChess(x, y);  
//      
//    if(isWin(x,y)){
//        var str = '哈哈你输了!'; 
//        setTimeout(function(){
//            gameover(str);
//        },300);
//    }else if(isEnd()){  
//        var str = '平局啦~~';  
//        setTimeout(function(){
//            gameover(str);
//        },300);
//    }
//}  

// best position for computer
function best(){
    var bestMove = null;
    var bestWeight = 0;

    for(var i = 0; i < cells.length; i++){
            if(cells[i].html() === ''){
                cells[i].html() = '0';
                checkWin();
                if(gameover = true)
                {
                    weight = 1000;
                    cells[i].html() = '0';
                    cells.[i].css('background-image', 'url(src/Image/tokens/default_O.png)');
                } else if(checkTie()){
                    weight = Math.round(Math.random() * 100 - 50);
                    cells[i].html() = '0';
                    cells.[i].css('background-image', 'url(src/Image/tokens/default_O.png)');
                }else{
                    weight = Math.round(Math.random() * 800 - 400);} 
                    if(bestX == null || weight >= bestWeight){  
                        bestX = i;  
                        bestY = j;  
                        bestWeight = weight;  
                    }  
                
            }
    }
    return {x : bestX, y : bestY, weight : bestWeight}; 
}