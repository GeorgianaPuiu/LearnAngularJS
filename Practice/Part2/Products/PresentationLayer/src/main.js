(function () {
    'use strict';

    angular.module('app', ['ngResource', 'ngMessages', 'ngRoute', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.modal', 'ui.bootstrap.popover', 'ui.bootstrap.tpls'])
        .constant('apiUrlBase', 'http://localhost:8083/')
        .config(['$routeProvider', '$stateProvider', Config]);


    function Config($routeProvider, $stateProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html'
            })
            .when('/products', {
                templateUrl: 'partials/productsList.html',
                controller: 'ProductCtrl'
            })
            .when('/contact', {
                templateUrl: 'partials/contact.html'
            });
    //        .otherwise({
    //        redirectTo: '/'
    //    });


        $stateProvider
            .state('productsState', {
                url: '/products',
                controller: 'ProductCtrl',
                templateUrl: 'partials/productsList.html'
            })
            .state('productsState.productState', {
                url: '/{productID:int}',
                onEnter: [
                    '$modal', '$state', function ($modal, $state) {
                        $modal.open({
                            controller: 'ProductDetailsCtrl',
                            controllerAs: 'productDetailsCtrl',
                            templateUrl: 'partials/productDetails.html',
                            size : 'lg'
                        }).result.finally(function () {
                            $state.go('^');
                        });
                    }
                ]
            });
    }
})();

