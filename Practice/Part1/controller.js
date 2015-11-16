app.controller('ProductCtrl', function ($http, $timeout, $log) {
    var self = this;
    
    self.addProductFlag = 0;
    self.orderCriteria = 'name';
    self.orderAsc = true;
    
    $http.get('dataFormat.json').success(function (data) {
        self.productDetails = data;
    });

    $http.get('data.json').success(function (data) {
        self.products = data;
    });

    self.setAddProductFlag = function (flag) {
        self.addProductFlag = flag;
    };

    self.submitAddProduct = function () {
        var nrOfDays = self.newProduct.newNrOfDaysAvailable;

        self.newProduct.entryDate = new Date();
        self.newProduct.expDate = new Date().setDate(self.newProduct.entryDate.getDate() + nrOfDays);
        
        self.products.push(self.newProduct);     
        self.newProduct = null;
        
        self.addProductFlag = 0;
    };

    self.setOrderCriteria = function (newCriteria) {
        if (newCriteria === self.orderCriteria) {
            self.orderAsc = !self.orderAsc;
        } else {
            self.orderCriteria = newCriteria;
            self.orderAsc = true;
        }
    };

    self.startTimeout = function (n) {
        $timeout(function () {
            if (n > 0) {
                console.log(n + " time!!!");
                self.startTimeout(n - 1000);
            } else {
                $log.info(n + " s-a scurs timpul!!");
            }
        }, n);
    };
    
    self.getOrderClass = function(criteria){
        if(self.orderCriteria === criteria){
            if(self.orderAsc){
                return "asc";
            }
            return "desc";
            
        }
        else
            return "";
        
    };
});