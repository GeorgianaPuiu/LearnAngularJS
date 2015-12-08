(function(){
    'use strict';

    angular.module('app', ['ngResource', 'ngMessages', 'ngRoute'])
        .constant('apiUrlBase', 'http://localhost:8083/')
        .config(['$routeProvider', Config]);


    function Config($routeProvider){        
        $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html'
        }).
        when('/products', {
            templateUrl: 'partials/productsList.html',
            controller: 'ProductCtrl'
        }).
        when('/contact', {
            templateUrl: 'partials/contact.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }

})();

