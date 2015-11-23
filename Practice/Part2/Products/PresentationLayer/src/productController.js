app.controller('ProductCtrl', function ($http, $timeout, $log, $filter) {
    var self = this;
    var apiServiceUrl = apiBaseUrl + 'api/products';

    self.orderAsc = true;
    self.addProductFlag = false;
    self.editProductFlag = false;
    self.readProductFlag = false;
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
            self.initAction();
        })
            .error(function (data, status, header, config) {
            self.action.message = "Please reload the page. An error occured when trying to fetch data. " + status;
            self.action.color = "blue";
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

    //functions
    function createProduct(data, config){        
        $http.post(apiServiceUrl, data, config)
            .success(function (data, status, headers, config) {
            self.loadProducts();
        })
            .error(function (data, status, header, config) {
            self.action.message = "The product was not added!" + status;
            self.action.color = "red";
        });
    };

    function updateProduct(data, config){        
        $http.put(apiServiceUrl+'/update', data, config)
            .success(function (data, status, headers, config) {
            self.loadProducts();
        })
            .error(function (data, status, header, config) {
            self.action.message = "The product was not updated!" + status;
            self.action.color = "red";
        });
    };



    self.submitProductForm = function () {       
        if(self.readProductFlag === false){        
            self.newProduct.ExpirationDate = new Date(self.newProduct.ExpirationDate);   

            if(self.addProductFlag === true){
                self.newProduct.EntryDate = self.today;            
            }

            var data = self.newProduct;  
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            if(self.addProductFlag === true){
                createProduct(data, config);
            }

            if(self.editProductFlag === true){
                updateProduct(data, config);
            }
        }

        self.newProduct = null;
        self.setAllFlags(false);
    };

    self.deleteProduct = function (id) {
        $http.delete(apiServiceUrl + '/' + id)
            .success(function (data, status, headers) {
            self.loadProducts();
        })
            .error(function (data, status, header, config) {
            self.action.message = "The product was not deleted!" + status;
            self.action.color = "red";
        });
    };

    self.wantToDeleteProduct = function (id) {
        self.action.message = "Are you sure you want to delete the product?";
        self.action.productID = id;
        self.action.decide = true;
        self.action.color = 'blue';
    }

    self.openDetails = function (id) {
        self.newProduct = $filter('filter')(self.products, {
            ID: id
        })[0];
        self.readProductFlag = true;
    };

    self.wantToEditProduct = function (id) {
        var prod = $filter('filter')(self.products, {
            ID: id
        })[0];
        self.newProduct = angular.copy(prod);
        self.newProduct.ExpirationDate = new Date(self.newProduct.ExpirationDate);
        self.editProductFlag = true;
    };

    self.initAction = function () {
        self.action = {
            message: '',
            color: 'black',
            productID: -1,
            decide: false
        };
    };


    self.setAllFlags = function (val) {
        self.addProductFlag = val;
        self.editProductFlag = val;
        self.readProductFlag = val;
    };

    self.initAction();

    self.loadProducts();
});