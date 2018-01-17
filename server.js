
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuid = require('uuid');


app.use(express.static(__dirname + '/web-socketioTest'));



//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

io.set('origins', '*:*');
var users = [];
io.on('connection', function(socket){
  console.log('a user connected');
  var newuser = {
      id: uuid.v1(),
      current_life: 100,
      max_life: 100,
      character: ""
  };
  users.push(JSON.parse(JSON.stringify(newuser)));
  console.log(users);
  socket.emit('user', newuser);
  io.sockets.emit('users_update', users);

  socket.on('msg', function (data, callback){
		console.log("msg");
        data.date= new Date();
		io.sockets.emit('newmsg', data); //aqí envia la data
	});

    socket.on('character', function (data, callback){
        /*
            data: {
                character: "modelid",
                id: "userid"
            }
        */
        updateCharacter(data);
  		io.sockets.emit('users_update', users); //aqí envia la data
  	});


  socket.on('attack', function (d, callback){
        data = JSON.parse(d);
		console.log("attack");
        console.log(data);
        attackUser(data);
		io.sockets.emit('users_update', users); //aqí envia la data
	});
});

function attackUser(attack) {
    for(var i=0; i<users.length; i++) {
        if(users[i].id == attack.to) {
            users[i].current_life = users[i].current_life - attack.damage;
        }
    }
}

function updateCharacter(characterUpdate) {
    for(var i=0; i<users.length; i++) {
        if(users[i].id == characterUpdate.id) {
            users[i].character = characterUpdate.character;
        }
    }
}
http.listen(4444, function(){
  console.log('listening on *:4444');
});
