'use strict';

angular.module('myApp.chat', [
  'btford.socket-io', 'ngRoute'
])
.controller('ChatCtrl', function ($scope, socket) {
    $scope.msgs=[];

  socket.on('newmsg', function (data) {
      console.log(data);
    $scope.msgs.push(data.text);
  });
  $scope.msg={
      text: ""
  };
  $scope.send = function(){
      console.log("emitting");
      socket.emit("msg", $scope.msg, function(data){

      });
  };
});
