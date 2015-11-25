app.controller('CategoryCtrl', function ($http, $timeout, $log) {
    var self = this;
    var apiServiceUrl = apiBaseUrl + 'api/categories';
    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    self.isCategoryFormVisible = false;

    self.loadCategories = function () {
        $http.get(apiServiceUrl)
            .success(function (data) {
                self.categories = data;
            });
    };

    self.submitCategoryForm = function () {

        data = self.newCategory;
        $http.post(apiServiceUrl, data, config)
            .success(function (data, status, headers, config) {
                self.loadCategories();
            });
        self.isCategoryFormVisible = false;
    }

    self.loadCategories();
});