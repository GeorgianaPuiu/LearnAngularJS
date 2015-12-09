(function () {
    'use strict';

    angular.module('app')
        .controller('ProductDetailsCtrl', ['$stateParams', 'ProductService', '$modalInstance', ProductDetailsCtrl]);

    function ProductDetailsCtrl($stateParams, ProductService, $modalInstance) {
        var self, productID;
        self = this;
        productID = $stateParams.productID;
        
        self.error = null;
        self.product = null;

        self.close = function () {
            $modalInstance.close();
        };

        ProductService.getProductById(productID)
            .then(function (result) {
                self.product = result.data;
            }, (function (reason) {
                self.error = reason;
            }));
    }
})();