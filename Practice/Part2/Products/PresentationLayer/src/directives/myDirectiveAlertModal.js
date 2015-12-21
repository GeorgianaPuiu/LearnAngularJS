(function () {
    'use strict';
    angular.module('app').directive('myDirectiveAlertModal', ['$log', '$modal', '$state', function ($log, $modal, $state) {
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
            link: function ($scope, $element, $attrs) {
                var self = $scope;

                var ModalInstanceCtrl = function ($scope, $modalInstance) {
                    $scope.notification = self._notification;

                    $scope.Close = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.Ok = function () {
                        var p_id = self._productID;
                        
                        if (self._state) {
                            $state.go(self._state, {
                                productID: self._productID
                            });
                        } else {
                            self._deleteProductFn({
                                id: p_id
                            });
                        }
                        $scope.Close();
                    };
                };

                $scope.open = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'partials/alertModal.html',
                        controller: ModalInstanceCtrl
                    });
                };
            }
        }
    }]);
})()