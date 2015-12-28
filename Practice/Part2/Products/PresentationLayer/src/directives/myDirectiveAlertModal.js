/*global angular*/
(function () {
    'use strict';
    angular.module('app').directive('myDirectiveAlertModal', ['$modal', '$state', function ($modal, $state) {
        return {
            restrict: 'E',
            require: 'ngModel',
            template: '<span ng-click="open()" class="glyphicon glyphicon-{{_spanStyle}}" aria-hidden="true"></span>',
            scope: {
                _notification: '=ngModel',
                _deleteProductFn: '&deleteProductFn',
                _productID: '@productId',
                _spanStyle: '@spanStyle',
                _state: '@state'
            },
            link: function (scope, element, attrs) {
                scope.open = function () {
                    $modal.open({
                        templateUrl: 'partials/myDirectiveAlertModal.html',
                        controller: 'AlertModalCtrl',
                        controllerAs: 'alertModalCtrl',
                        scope: scope
                    });
                };
            }
        };
    }]);
})();