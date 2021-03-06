'use strict';
var tttapi = {
  gameWatcher: null,
  ttt: 'http://ttt.wdibos.com',
  token: '',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  //Authenticated api actions
  listGames: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
      }, callback);
  },

  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json',
    }, callback);
  },

  showGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  joinGame: function (id, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  },

  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, function(err,data) {
        if(err) {
          return console.error(err);
        }
      }
    );
  },

  watchGame: function (id, token) {
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  }
};


//$(document).ready(...
$(function() {
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };
  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, function (error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    $('.list-result').text('User Registered');
  });
    e.preventDefault();
  });

  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      $('.token').val(data.user.token);
      tttapi.token = data.user.token;
      console.log(tttapi.token);
      // turn on game area
      $('.list-result').text('Logged in, welcome! Time to play');
      $('.gamearea').on('click', '.cell', move);
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

  $('.list-games').on('click', function(e) {
  //  var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.listGames(tttapi.token,
      function(err,data){
        if(err) {
          return console.error(err);
        }
        for(var i=0; i < data.games.length; i++){
          if(data.games[i].player_o === null){
            gameList.push(data.games[i].id);
          }
        }
        $('.list-result').text('Local Game ID: \n' + gameList);
      }
    );
  });

  $('#create-game').on('submit', function(e) {
  //  var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(tttapi.token, callback);
  });

  $('#show-game').on('submit', function(e) {
    // var token = $(this).children('[name="token"]').val();
    var id = $('#show-id').val();
    e.preventDefault();

    $('.cell').css('background-image', 'none');
    $('.cell').html('');
    $('.cell').css('background-color','white');
    tttapi.showGame(id, tttapi.token,
      function(err,data){
        if(err) {
          return console.error(err);
        }
        for(var i = 0; i<cells.length; i++){
          cells[i].html(data.game.cells[i]);
          drawBoard();
        }
        checkWin();
        $('.list-result').text('Game loaded, time to play!');
        gameId = data.game.id;
      }
    );
  });

  $('#join-game').on('submit', function(e) {
   // var token = $(this).children('[name="token"]').val();
    var id = $('#join-id').val();
    e.preventDefault();
    console.log(tttapi.token);
    tttapi.joinGame(id, tttapi.token,
        function(err, data){
          if(err){console.log(err)}
        }
    );
  });

  $('#mark-cell').on('submit', function(e) {
//    var token = $(this).children('[name="token"]').val();
    gameId = data.game.id;
    var data = wrap('game', wrap('cell', form2object(this)));
    e.preventDefault();
    tttapi.markCell(id, data, tttapi.token, callback);
  });

  $('#watch-game').on('submit', function(e){
   // var token = $(this).children('[name="token"]').val();
    var id = $('#watch-id').val();
    e.preventDefault();

    var gameWatcher = tttapi.watchGame(id, tttapi.token);

    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      if (data.timeout) { //not an error
        this.gameWatcher.close();
        return console.warn(data.timeout);
      }
      var gameData = parsedData.game;
      var cells = gameData.cell;
      $('#watch-index').val(cells.index);
      $('#watch-value').val(cells.value);
    });
    gameWatcher.on('error', function(e){
      console.error('an error has occured with the stream', e);
    });
  });

});

