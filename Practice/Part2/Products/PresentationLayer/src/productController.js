app.controller('ProductCtrl', function ($http, $timeout, $log, $filter) {
    var self = this;
    var apiServiceUrl = apiBaseUrl + 'api/products';

    self.orderAsc = true;
    self.isProductFormVisible = false;
    self.isProductFormReadonly = false;
    self.isFormDataForAddProduct = true;
    self.isExpirationDateTooEarly = false;
    self.today = new Date();

    //get the header
    $http.get('http://localhost:8082/data/ProductDetails.json').success(function (data) {
        self.productDetails = data;
        self.orderCriteria = self.productDetails[0].key;
    });

    self.loadProducts = function () {
        $http.get(apiServiceUrl)
            .success(function (data) {
            self.products = data;
        })
            .error(function (data, status, header, config) {
            // self.action.message = "Please reload the page. An error occured when trying to fetch data. " + status;
            // self.action.color = "blue";
        });
    };

    self.loadProduct = function (id) {
        var url = apiServiceUrl + '/' + id;
        return $http.get(url).then(function (response) {
            return response.data;
        });
    };

    self.setOrderCriteria = function (newCriteria) {
        if (newCriteria === self.orderCriteria) {
            self.orderAsc = !self.orderAsc;
        } else {
            self.orderCriteria = newCriteria;
            self.orderAsc = true;
        }
    };

    self.getOrderClass = function (criteria) {
        if (self.orderCriteria === criteria) {
            if (self.orderAsc === true) {
                return "asc";
            }
            return "desc";
        }
        return "";
    };

    self.resetProductForm = function () {
        self.newProduct = null;
        self.isProductFormVisible = false;
        self.isProductFormReadonly = false;
        self.isFormDataForAddProduct = true;
        self.isExpirationDateTooEarly = false;
    };

    function createProduct(data) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        $http.post(apiServiceUrl, data, config)
            .success(function (data, status, headers, config) {
            self.loadProducts();
        })
            .error(function (data, status, header, config) {
            //self.action.message = "The product was not added!" + status;
            // self.action.color = "red";
        });
    };

    function updateProduct(data) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        $http.put(apiServiceUrl + '/update', data, config)
            .success(function (data, status, headers, config) {
            self.loadProducts();
        })
            .error(function (data, status, header, config) {
            //  self.action.message = "The product was not updated!" + status;
            //  self.action.color = "red";
        });
    };

    self.deleteProduct = function (id) {
        $http.delete(apiServiceUrl + '/' + id)
            .success(function (data, status, headers) {
            self.loadProducts();
        })
            .error(function (data, status, header, config) {});
    };

    self.submitProductForm = function (isProductFormValid) {
        if (isProductFormValid) {
            if (!self.isProductFormReadonly) {

                var data = self.newProduct;
                if (data.ExpirationDate >= self.today) {

                    if (self.isFormDataForAddProduct) {
                        data.EntryDate = self.today;
                        createProduct(data);
                    } else {
                        updateProduct(data);
                    }
                    self.resetProductForm();
                } else {
                    self.isExpirationDateTooEarly = true;
                }
            } else {
                self.resetProductForm();
            }
        }
    };

    self.readProduct = function (id) { //get from id
        var productFromDB = self.loadProduct(id);
        productFromDB.then(function (result) {
            self.newProduct = angular.copy(result);
            // self.newProduct.ExpirationDate = new Date(self.newProduct.ExpirationDate);
            self.isProductFormReadonly = true;
            self.isProductFormVisible = true;
        });
    };

    self.editProduct = function (id) {
        var productFromDB = self.loadProduct(id);
        productFromDB.then(function (result) {
            self.newProduct = angular.copy(result);
            self.newProduct.ExpirationDate = new Date(self.newProduct.ExpirationDate);
            self.newProduct.EntryDate = new Date(self.newProduct.EntryDate);
            self.isFormDataForAddProduct = false;
            self.isProductFormReadonly = false;
            self.isProductFormVisible = true;
        });
    };

    self.loadProducts();
});