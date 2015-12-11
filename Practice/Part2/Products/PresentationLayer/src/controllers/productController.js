(function () {
    'use strict';
    angular.module('app')
        .controller('ProductCtrl', ['$log', '$filter', 'ProductService', '$location', ProductCtrl]);

    function ProductCtrl($log, $filter, ProductService, $location) {
        var self = this;

        self.today = new Date();
        self.orderAsc = true;
        self.isProductFormVisible = false;
        self.isProductFormReadonly = false;
        self.isFormDataForAddProduct = true;
        self.isExpirationDateTooEarly = false;
        
        //Spinner
        self.isSpinnerVisible = true;

        //Product Form
        self.setOrderCriteria = setOrderCriteria;
        self.getOrderClass = getOrderClass;
        self.resetProductForm = resetProductForm;
        self.submitProductForm = submitProductForm;
        self.checkExpirationDate = checkExpirationDate;
        self.openProductFormToAddData = openProductFormToAddData;


        //Product CRUD Operations
        //create is in submitProductForm
        self.readProduct = readProduct;
        self.editProduct = editProduct;
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

        function resetProductForm() {
            self.newProduct = null;
            self.isProductFormVisible = false;
            self.isProductFormReadonly = false;
            self.isFormDataForAddProduct = true;
            self.isExpirationDateTooEarly = false;
        }

        function submitProductForm() {
            var data, promise;
            data = self.newProduct;
            if (self.isFormDataForAddProduct) {
                data.EntryDate = self.today;
                promise = ProductService.addProduct(data);
            } else {
                promise = ProductService.updateProduct(data);
            }
            self.isSpinnerVisible = true;
            promise.then(function (result) {
                refreshProductsList();
            });
            self.resetProductForm();
        }

        function checkExpirationDate() {
            var expDate = self.newProduct.ExpirationDate;
            if (expDate < self.today) {
                self.isExpirationDateTooEarly = true;
            } else {
                self.isExpirationDateTooEarly = false;
            }
        }

        function readProduct(id) {
            ProductService.getProductById(id)
                .then(function (result) {
                    self.newProduct = result.data;
                    self.isProductFormReadonly = true;
                    self.isProductFormVisible = true;
                });
        }

        function editProduct(id) {
            ProductService.getProductById(id).then(function (result) {
                self.newProduct = result.data;
                self.newProduct.ExpirationDate = new Date(self.newProduct.ExpirationDate);
                self.newProduct.EntryDate = new Date(self.newProduct.EntryDate);

                self.isFormDataForAddProduct = false;
                self.isProductFormReadonly = false;
                self.isProductFormVisible = true;
            });
        }

        function deleteProduct(id) {
            self.isSpinnerVisible = true;
            ProductService.deleteProductById(id)
                .then(function (result) {
                    $log.info("deleted " + result.data);
                    refreshProductsList();
                });
        }
                
        function openProductFormToAddData()
        {
            self.isProductFormVisible = true;
            self.newProduct = null;
        }       
        
        initProductTable();
    }
})();