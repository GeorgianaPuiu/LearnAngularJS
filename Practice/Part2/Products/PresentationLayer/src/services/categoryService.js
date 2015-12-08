(function () {
    'use strict';
    angular.module('app')
        .factory('CategoryService', ['$resource', 'apiUrlBase', CategoryService]);

    function CategoryService($resource, apiUrlBase) {
        var apiServiceUrl = apiUrlBase + 'api/categories';
        return $resource(apiServiceUrl, null);
    }
})();