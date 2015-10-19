$('.multiplayer').click(function(){
    // remove single player and multiplayer icons
    $('.multiplayer').css('display', 'none');
    $('.singleplayer').css('display', 'none');
    // show local, remote, and back icons
    $('.local').css('display', 'block');
    $('.remote').css('display', 'block');
    $('.back').css('display', 'block');
})

$('.back').click(function(){
    // remove local, remote, and back icons
    $('.local').css('display', 'none');
    $('.remote').css('display', 'none');
    $('.back').css('display', 'none');
    $('.stat_player').css('display', 'none');
    $('.stat_singleplayer').css('display', 'none');
    // clear game area and turn it off
    $('.cell').css('background-image', 'none');
    $('.cell').html('');
    $('.cell').css('background-color','white');
    $('.gamearea').off();
    // show single player and multiplayer icons
    $('.menu').css('display', 'block');
    $('.multiplayer').css('display', 'block');
    $('.singleplayer').css('display', 'block');
})

$('.local').click(function(){
    // remove regular menu and show game status
    $('.menu').css('display', 'none');
    // clear game list text area
    $('.list-result').text('');
    // show status of local game
    $('.stat_player').css('display', 'block');
    // game message
    $('.list-result').text('Please login to play');
    // mutiplayer mode, assign remote to false
    multiplayer = true;
    singleplayer = false;
    remote = false;
})

$('.remote').click(function(){
    // remove regular menu and show game status
    $('.menu').css('display', 'none');
    // clear game list text area
    $('.list-result').text('');
    // show status of multi player game
    $('.stat_player').css('display', 'block');
    // game message
    $('.list-result').text('Please login to play');
    // multiplayer mode, assign remote to true
    multiplayer = true;
    singleplayer = false;
    remote = true;
})

$('.singleplayer').click(function(){
    // remove regular menu and show game status
    $('.menu').css('display', 'none');
    // clear game list text area
    $('.list-result').text('');
    // show status of single player game
    $('.stat_singleplayer').css('display', 'block');
    $('.back').css('display', 'block');
     // turn on game area
    $('.gamearea').on('click', '.cell', move);
    // assign bot to true
    singleplayer = true;
    multiplayer = false;
    remote = false;
})

$('.newgame').click(reset);
