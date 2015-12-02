app.factory('CategoryService', ['$resource', function ($resource) {
    var apiServiceUrl = apiBaseUrl + 'api/categories';  
    return $resource(apiServiceUrl, null);
}]);