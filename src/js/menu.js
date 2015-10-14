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
    $('.stat_singleplayer').css('display', 'none');
    // show single player and multiplayer icons
    $('.menu').css('display', 'block');
    $('.multiplayer').css('display', 'block');
    $('.singleplayer').css('display', 'block');
})

$('.local').click(function(){
    // remove regular menu and show game status
    $('.menu').css('display', 'none');
    // show status of single player game
    $('.stat_singleplayer').css('display', 'block');
})