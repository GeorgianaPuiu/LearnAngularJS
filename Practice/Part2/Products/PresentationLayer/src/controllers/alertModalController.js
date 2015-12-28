/*global angular*/
(function () {
    'use strict';
    angular.module('app')
        .controller('AlertModalCtrl', ['$modalInstance', '$state', '$scope', AlertModalCtrl]);

    //$scope is the directive scope passed on open modal
    function AlertModalCtrl($modalInstance, $state, $scope) {
        var self = this;
        
        self.notification = $scope._notification;

        self.close = function () {
            $modalInstance.dismiss('cancel');
        };

        self.ok = function () {
            var p_id = $scope._productID;

            if ($scope._state) {
                $state.go($scope._state, {
                    productID: $scope._productID
                });
            } else {
                $scope._deleteProductFn({
                    id: p_id
                });
            }
            self.close();
        };
    }
})();