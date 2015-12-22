(function () {
    'use strict';
    angular.module('app')
        .service('ProductService', ['$log', '$http', 'apiUrlBase', ProductService]);

    function ProductService($log, $http, apiUrlBase) {

        var apiServiceUrl, config;
        apiServiceUrl = apiUrlBase + 'api/products';
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        this.getAllProducts = getAllProducts;
        this.getProductById = getProductById;
        this.addProduct = addProduct;
        this.updateProduct = updateProduct;
        this.deleteProductById = deleteProductById;
        
        this.getProductTableHeader = getProductTableHeader;

        function getAllProducts() {
            return $http.get(apiServiceUrl)
                .success(function (data) {
                    return data;
                })
                .error(function (data, status) {
                    $log.error("Get all products returned error, data: " + data + " with status " + status);
                    return null;
                });
        }

        function getProductById(id) {
            return $http.get(apiServiceUrl + '/' + id)
                .success(function (data) {
                    return data;
                })
                .error(function (data, status) {
                    $log.error("Get product by id: " + id + " returned error, data: " + data + " with status " + status);
                    return null;
                });

        }


        function addProduct(data) {
            return $http.post(apiServiceUrl, data, config)
                .success(function (data) {
                    return true;
                })
                .error(function (data, status) {
                    $log.error("Add product returned error, data: " + data + " with status " + status);
                    return false;
                });
        }

        function updateProduct(data) {
            return $http.put(apiServiceUrl + '/update', data, config)
                .success(function (data, status) {
                    return true;
                }).error(function (data, status) {
                    $log.error("Update product returned error, data: " + data + " with status " + status);
                    return false;
                });
        }

        function deleteProductById(id) {
            return $http.delete(apiServiceUrl + '/' + id)
                .success(function (data, status) {
                    return true;
                })
                .error(function (data, status) {
                    $log.error("Delete product returned error, data: " + data + " with status " + status);
                    return false;
                });
        }

        function getProductTableHeader() {
            return $http.get('http://localhost:8082/data/ProductDetails.json')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    $log.error("Get product details returned error : " + response);
                    return null;
                });
        }
    }
})();