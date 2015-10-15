'use restrict';

var gameover = false;
var cells = [];
var turn = 'x';
var p1Win = 0;
var p2Win = 0;
var tie = 0;
var gameId = 0;
var gameList = [];

$('.p1win').html(p1Win);
$('.p2win').html(p2Win);
$('.tie').html(tie);

// remote status
var remote = false;


for(var i=0; i<9; i++){
    cells[i] = $('.cell'+(i+1));
}

var winCombo = function winCombo(c1, c2, c3) {
    if(c1.html() !== '' && c1.html() === c2.html() && c1.html() === c3.html()) {
      gameover = true;
      c1.css('background-color','limeGreen');
      c2.css('background-color','limeGreen');
      c3.css('background-color','limeGreen');
      if(c1.html() === 'x'){
          console.log("Player X wins!");
          $('.p1win').html(++p1Win);
      }
      else{
          console.log("Player O wins!");
          $('.p2win').html(++p2Win);
      }
    }
  }

var checkTie = function checkTie() {
    for (var i = 0; i<cells.length; i++){
        if(cells[i].html() === '') return false;
    }
    return true;
}

var checkWin = function checkWin() {
    winCombo(cells[0], cells[1], cells[2]);
    winCombo(cells[0], cells[3], cells[6]);
    winCombo(cells[0], cells[4], cells[8]);
    winCombo(cells[1], cells[4], cells[7]);
    winCombo(cells[2], cells[4], cells[6]);
    winCombo(cells[2], cells[5], cells[8]);
    winCombo(cells[3], cells[4], cells[5]);
    winCombo(cells[6], cells[7], cells[8]);
  }

var drawBoard = function drawBoard(){
  // update game status on local board
    for(var i = 0; i<cells.length; i++){
        if(cells[i].html() === 'x' ) {
            cells[i].css('background-image', 'url(src/Image/tokens/default_X.png)');}
        if (cells[i].html() === 'o'){
            cells[i].css('background-image', 'url(src/Image/tokens/default_O.png)');
        }
    }
}

 var move = function move() {
    var $this = $(this);
    if(gameover === true || $this.html() !== '') {
        return;
    } else {
        $this.html(turn);
        if(turn === 'x'){
            turn = 'o';
        } else{
          turn ='x';
        }
    }
    drawBoard();
    if(checkTie()) {$('.tie').html(++tie);}
    checkWin();
  }

var reset = function reset() {
    $('.cell').css('background-image', 'none');
    $('.cell').html('');
    $('.cell').css('background-color','white');
    gameover = false;
    // create game to server
    tttapi.createGame(tttapi.token,
        function(err,data) {
            if(err) {
                return console.error(err);
            }
            gameId = data.game.id;
        }
    );

  }

$('.newgame').click(reset);




