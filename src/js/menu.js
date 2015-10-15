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
    // clear game area and turn it off
    reset();
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
    // show status of single player game
    $('.stat_player').css('display', 'block');
    // turn on game area
    $('.gamearea').on('click', '.cell', move);
    // login
    tttapi.login(
        {
            "credentials": {
                "email": "meng@js.com",
                "password": "11111"
            }
        },
        function(err, data){
            if(err) {
                return console.error(err);
            }
            tttapi.token = data.user.token;
            console.log(tttapi.token);
        }
    );
    // assign remote to false
    remote = false;
})

$('.remote').click(function(){
    // remove regular menu and show game status
    $('.menu').css('display', 'none');
    // clear game list text area
    $('.list-result').text('');
    // some status of multi player game
    $('.stat_player').css('display', 'block');
    // turn on game area
    $('.gamearea').on('click', '.cell', move);


})
