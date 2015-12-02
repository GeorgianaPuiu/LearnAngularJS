app.service('ProductService', ['$log', '$http', function ($log, $http) {

    var apiServiceUrl = apiBaseUrl + 'api/products';
    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    this.getAllProducts = function () {
        return $http.get(apiServiceUrl)
            .success(function (response) {
            return response;
        }).error(function (data, status) {
            $log.error("Get all products returned error, data: " + data + " with status " + status);
            return null;
        });
    };

    this.getProductById = function (id) {
        return $http.get(apiServiceUrl + '/' + id)
            .success(function (response) {
            return response;
        }).error(function (data, status) {
            $log.error("Get product by id: " + id + " returned error, data: " + data + " with status " + status);
            return null;
        });

    };

    this.addProduct = function (data) {
        return $http.post(apiServiceUrl, data, config)
            .success(function (data) {
            return true;
        }).error(function (data, status) {
            $log.error("Add product returned error, data: " + data + " with status " + status);
            return false;
        });
    };

    this.updateProduct = function (data) {
        return $http.put(apiServiceUrl + '/update', data, config)
            .success(function (data, status) {
            return true;
        }).error(function (data, status) {
            $log.error("Update product returned error, data: " + data + " with status " + status);
            return false;
        });
    };

    this.deleteProductById = function (id) {
        return $http.delete(apiServiceUrl + '/' + id)
            .success(function (data, status) {
            return true;
        }).error(function (data, status) {
            $log.error("Delete product returned error, data: " + data + " with status " + status);
            return false;
        });
    };


    this.getProductDetails = function () {
        //get the header
        return $http.get('http://localhost:8082/data/ProductDetails.json')
        .then(function (response) {
            return response.data;
        }).catch(function (response) {
            $log.error("Get product details returned error : " + response);
            return null;
        }).finally(function () {
            $log.info("Get product details was called.");
        });
    };

}]);