'use strict';

angular.module('app', [
        'ngRoute',
        'btford.socket-io',
        'ngMaterial',
        'app.playground'
    ])
    .factory('socket', function(socketFactory) {
        return socketFactory({
            ioSocket: io.connect('localhost:3000')
        });
        //return socketFactory();
    })
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/playground/playground.html',
                controller: 'PlaygroundCtrl'
            });

        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
