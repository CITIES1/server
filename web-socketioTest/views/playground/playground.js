'use strict';

angular.module('app.playground', [
  'btford.socket-io', 'ngRoute', 'ngAnimate'
])
.controller('PlaygroundCtrl', function ($scope, socket,
    $filter) {
    $scope.msgs=[];
    $scope.my_id="";
    $scope.user={};
    $scope.users=[];

  socket.on('newmsg', function (data) {
    console.log(data);
    $scope.msgs.push(data);
  });
  socket.on('user', function (data) {
      console.log(data);
      $scope.my_id=data.id;
    $scope.user = data;
  });
  socket.on('users_update', function (data) {
      console.log(data);
    $scope.users = data;
    $scope.user = $filter('filter')(data, {id: $scope.my_id})[0];
    console.log($scope.user);
  });
  $scope.msg={};
  $scope.send = function(){
      if($scope.msg.text)
      {
          console.log("emitting");
          socket.emit("msg", $scope.msg, function(data){

          });
          $scope.msg={};
      }
  };
  $scope.attack = function(id){
      console.log(id);
      var attack = {
          from: $scope.user.id,
          to: id,
          damage: 1
      };
      socket.emit("attack", JSON.stringify(attack), function(data){

      });
  };

});
