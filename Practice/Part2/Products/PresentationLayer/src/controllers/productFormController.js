(function () {
    'use strict';

    angular.module('app')
        .controller('ProductFormCtrl', ['$stateParams', 'ProductService', '$modalInstance', ProductFormCtrl]);

    function ProductFormCtrl($stateParams, ProductService, $modalInstance) {
        var self, productID;

        self = this;
        productID = $stateParams.productID;

        self.error = null;
        self.product = null;
        self.today = new Date();

        self.checkExpirationDate = checkExpirationDate;
        self.submitProductForm = submitProductForm;
        self.closeModal = closeModal;

        if (productID) { //if the id is in te url then is update
            ProductService.getProductById(productID)
                .then(function (result) {
                    self.product = result.data;
                    self.product.ExpirationDate = new Date(self.product.ExpirationDate);
                    self.product.EntryDate = new Date(self.product.EntryDate);
                }, (function (reason) {
                    self.error = reason;
                }));
        }


        function submitProductForm() {
            var data, promise;
            data = self.product;
            if (productID === null) {
                data.EntryDate = self.today;
                promise = ProductService.addProduct(data);
            } else {
                promise = ProductService.updateProduct(data);
            }
            promise.then(function (result) {
                closeModal();
            });
        }

        function closeModal() {
            $modalInstance.close();
        }
        
        function checkExpirationDate() {
            var expDate = self.product.ExpirationDate;
            if (expDate < self.today) {
                self.isExpirationDateTooEarly = true;
            } else {
                self.isExpirationDateTooEarly = false;
            }
        }
    }
})();