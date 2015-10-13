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
    // show single player and multiplayer icons
    $('.multiplayer').css('display', 'block');
    $('.singleplayer').css('display', 'block');
})

