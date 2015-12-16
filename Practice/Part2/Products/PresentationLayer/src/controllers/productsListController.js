(function () {
    'use strict';
    angular.module('app')
        .controller('ProductsListCtrl', ['$log', 'ProductService', '$scope', ProductsListCtrl]);

    function ProductsListCtrl($log, ProductService, $scope) {
        var self = this;

        self.orderAsc = true;

        //Spinner
        self.isSpinnerVisible = true;

        //Products table
        self.setOrderCriteria = setOrderCriteria;
        self.getOrderClass = getOrderClass;
        
        self.deleteProduct = deleteProduct;


        function refreshProductsList() {
            ProductService.getAllProducts()
                .then(function (result) {
                self.isSpinnerVisible = false;
                self.products = result.data;
            });
        }

        function initProductTable() {
            ProductService.getProductTableHeader()
                .then(function (result) {
                self.productTableHeaderItems = result;
                self.orderCriteria = self.productTableHeaderItems[0].key;
            });
            refreshProductsList();
        }

        function setOrderCriteria(newCriteria) {
            if (newCriteria === self.orderCriteria) {
                self.orderAsc = !self.orderAsc;
            } else {
                self.orderCriteria = newCriteria;
                self.orderAsc = true;
            }
        }

        function getOrderClass(criteria) {
            if (self.orderCriteria === criteria) {
                if (self.orderAsc === true) {
                    return "asc";
                }
                return "desc";
            }
            return "";
        }


        function deleteProduct(id) {
            self.isSpinnerVisible = true;
            ProductService.deleteProductById(id)
                .then(function (result) {
                $log.info("deleted " + result.data);
                refreshProductsList();
            });
        }
        initProductTable();

        /*
        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $log.info("state change start from " + fromState.name + " to state " + toState.name);
        });
        */
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $log.info("state change success from " + fromState.name + " to state " + toState.name);
            if(toState.name === 'productsState'){
               
                refreshProductsList();
                $log.info('The table was initializated and the products refreshed');
            }
        });
    }
})();