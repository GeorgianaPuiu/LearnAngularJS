app.controller('ProductCtrl', function ($log, $filter, ProductService) {
    var self = this;

    self.orderAsc = true;
    self.isProductFormVisible = false;
    self.isProductFormReadonly = false;
    self.isFormDataForAddProduct = true;
    self.isExpirationDateTooEarly = false;
    self.today = new Date();

    function refreshProductsList() {
        ProductService.getAllProducts().then(function (result) {
            self.products = result.data;
        });

    };

    function initProductTable() {
        ProductService.getProductDetails().then(function (result) {
            self.productDetails = result;
            self.orderCriteria = self.productDetails[0].key;
        });
        refreshProductsList();
    };

    initProductTable();

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

    self.submitProductForm = function () {
        var data = self.newProduct;
        var promise;
        if (self.isFormDataForAddProduct) {
            data.EntryDate = self.today;
            promise = ProductService.addProduct(data);
        } else {
            promise = ProductService.updateProduct(data);
        }
        promise.then(function(result){
            refreshProductsList();
        });      
        self.resetProductForm();
    };

    self.checkExpirationDate = function () {
        var expDate = self.newProduct.ExpirationDate;
        if (expDate < self.today) {
            self.isExpirationDateTooEarly = true;
        } else {
            self.isExpirationDateTooEarly = false;
        }
    };

    self.readProduct = function (id) {
        ProductService.getProductById(id).then(function (result) {
            self.newProduct = result.data;
            self.isProductFormReadonly = true;
            self.isProductFormVisible = true;
        });
    };

    self.editProduct = function (id) {
        ProductService.getProductById(id).then(function (result) {
            self.newProduct = result.data;
            self.newProduct.ExpirationDate = new Date(self.newProduct.ExpirationDate);
            self.newProduct.EntryDate = new Date(self.newProduct.EntryDate);

            self.isFormDataForAddProduct = false;
            self.isProductFormReadonly = false;
            self.isProductFormVisible = true;
        });
    };

    self.deleteProduct = function (id) {
        ProductService.deleteProductById(id).then(function (result) {
            $log.info("deleted " + result.data);
            refreshProductsList();
        });

    };
});