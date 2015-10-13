'use restrict'; 

var gameover = false;
var cells = [];
var turn = '1';

for(var i=0; i<9; i++){
    cells[i] = $('.cell'+(i+1));
}

var winCombo = function winCombo(c1, c2, c3) {
    if(c1.html() !== '' && c1.html() === c2.html() && c1.html() === c3.html()) {
      gameover = true;
      c1.css('background-color','limeGreen');
      c2.css('background-color','limeGreen');
      c3.css('background-color','limeGreen');
      if(c1.html() === '1'){
          console.log("Player X wins!");
      }
      else{
          console.log("Player O wins!");
      }
    }
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
  
 var move = function move() {
    var $this = $(this);
    if(gameover === true || $this.html() !== '') {
        return;
    } else {
    $this.html(turn);
        if(turn === '1'){
            turn = '0';
            $this.css('background-image', 'url(src/Image/tokens/default_X.png)');
        } else{
          turn ='1';
            $this.css('background-image', 'url(src/Image/tokens/default_O.png)');
        }
    }
    checkWin();
  }
  
var reset = function reset() {
    $('.cell').css('background-image', 'none');
    $('.cell').html('');
    $('.cell').css('background-color','white');
    gameover = false;
  }


$('.gamearea').on('click', '.cell', move);
$('.local').click(reset);
