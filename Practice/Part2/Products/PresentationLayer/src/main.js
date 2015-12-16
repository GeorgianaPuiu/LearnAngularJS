(function () {
    'use strict';

    angular.module('app', ['ngResource', 'ngMessages', 'ngRoute', 'ui.router' , 'ui.bootstrap', 'ui.bootstrap.modal', 'ui.bootstrap.popover', 'ui.bootstrap.tpls'])
        .constant('apiUrlBase', 'http://localhost:8083/')
        .config(['$routeProvider', '$stateProvider', '$urlRouterProvider', Config]);


    function Config($routeProvider, $stateProvider, $urlRouterProvider) {
 
    /*  ngRoute implementation    
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
    */       

        $stateProvider
            .state('homeState', {
                url: '/',
                templateUrl: 'partials/home.html'
            })
            .state('contactState', {
                url: '/contact',
                templateUrl: 'partials/contact.html'
            })
            .state('productsState', {
                url: '/products',
                templateUrl: 'partials/productsList.html'
            })
            .state('productsState.readProductState', {
                url: '/{productID:int}',
                onEnter: [
                    '$modal', '$state', function ($modal, $state) {
                        $modal.open({
                            controller: 'ReadProductCtrl',
                            controllerAs: 'readProductCtrl',
                            templateUrl: 'partials/readProductModal.html',
                            size : 'sm'
                        }).result.finally(function () {
                            $state.go('^');
                            console.log('this is finally read modal');
                        });
                    }
                ]
            })
            .state('productsState.openProductFormModalState', {
            url: '/product/:productID',
            params: {
                productID: { squash: true, value: null }                
            },
            onEnter: [
                '$modal', '$state', function ($modal, $state) {
                    $modal.open({
                        controller: 'ProductFormCtrl',
                        controllerAs: 'productFormCtrl',
                        templateUrl: 'partials/productFormModal.html',
                        size : 'lg'
                    }).result.finally(function () {
                        $state.go('productsState');
                        console.log('this is finally create/edit modal');
                    });
                }
            ]
        });
                
        $urlRouterProvider.otherwise('/');
    }
})();

