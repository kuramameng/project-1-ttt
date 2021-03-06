'use restrict';
/****** define global variables******/
var gameover = false;
// assign cell info using jQuery DOM
var cells = [];
for(var i=0; i<9; i++){
    cells[i] = $('.cell'+(i+1));
}
var turn = 'x';
var p1Win = 0;
var p2Win = 0;
var tie = 0;
var gameId = 0;
var gameList = [];
var credentials = {};
var dataCell = {
      game: {
        cell:{}
      }
    };
var currentCellIndex = 0;
var currentCellValue = '';
var mutiplayer = false;
var singleplayer = false;
var remote = false;
var botTest = false;

/******Game functions******/
var winCombo = function winCombo(c1, c2, c3) {
      if(c1.html() !== '' && c1.html() === c2.html() && c1.html() === c3.html()){
        if(botTest){
          gameover = true;
        }
        else {
          gameover = true;
          c1.css('background-color','limeGreen');
          c2.css('background-color','limeGreen');
          c3.css('background-color','limeGreen');
          if(c1.html() === 'x'){
              $('.list-result').text("Player X wins!");
              $('.p1win').html(p1Win++);
          }
          else{
              $('.list-result').text("Player O wins!");
              $('.p2win').html(p2Win++);
          }
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
      $('.cell').click(function (event) {
        currentCellValue = $(this).text();
        currentCellIndex = $(this).index();
      });
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
  // check multiplayer status
  if(multiplayer){
    // local mode
    if(!remote){
      if(gameover|| $this.html() !== '') {
        return;
      } else {
        $this.html(turn);
          if(turn === 'x'){
            turn = 'o';
              dataCell.game.cell.index = currentCellIndex;
              dataCell.game.cell.value = 'x';
          } else{
            turn ='x';
              dataCell.game.cell.index = currentCellIndex;
              dataCell.game.cell.value = 'o';
          }
      }
      // pushing game info to the server
      tttapi.markCell(gameId,dataCell, tttapi.token, function(err,data) {
        if(err) {
          return console.error(err);
        }
      });
    }
    // remote mode
    if(remote){
      tttapi.watchGame(gameId,tttapi.token);
      if(gameover|| $this.html() !== '') {
        return;
      } else {
        $this.html(turn);
        if(turn === 'x'){
          turn = 'o';
          dataCell.game.cell.index = currentCellIndex;
          dataCell.game.cell.value = 'x';
        } else{
          turn ='x';
          dataCell.game.cell.index = currentCellIndex;
          dataCell.game.cell.value = 'o';
        }
      }
      // pushing game info to the server
      tttapi.markCell(gameId,dataCell, tttapi.token, function(err,data) {
        if(err) {
          return console.error(err);
        }
      });
    }
  }
  // check single player status
  if(singleplayer){
    if(gameover || $this.html() !== '') {
      return;
    } else {
      $this.html(turn);
        if(turn === 'x'){
          turn = 'o';
          $('.gamearea').off();
        }
        if(turn === 'o'){
          turn ='x';
          computerMove(computerThink());
          $('.gamearea').on('click', '.cell', move);
        }
    }
  }
  // update board representation
  drawBoard();
  // check winning conditions
  if(checkTie()) {$('.tie').html(++tie);}
  checkWin();
}

var reset = function reset() {
      $('.cell').css('background-image', 'none');
      $('.cell').html('');
      $('.cell').css('background-color','white');
      gameover = false;
      if(multiplayer){
        // create game to server
        tttapi.createGame(tttapi.token,
          function(err,data) {
            if(err) {
              return console.error(err);
            }
            gameId = data.game.id;
            $('.list-result').text('Game created. Game ID: ' + gameId);
          });
      }
    }

// display player status
$('.p1win').html(p1Win);
$('.p2win').html(p2Win);
$('.tie').html(tie);
