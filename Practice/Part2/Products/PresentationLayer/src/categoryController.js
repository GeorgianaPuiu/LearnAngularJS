app.controller('CategoryCtrl', function ($http, $timeout, $log) {
    var self = this;
    var apiServiceUrl = apiBaseUrl + 'api/categories';
    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    self.addCategoryFlag = true;

    self.loadCategories = function () {
        $http.get(apiServiceUrl)
            .success(function (data) {
            self.categories = data;
        });
    };

    self.submitForm = function(){

        data = self.newCategory;        
        $http.post(apiServiceUrl, data, config)
            .success(function (data, status, headers, config) {
            self.loadCategories();
        })
            .error(function (data, status, header, config) {
            self.action.message = "The category was not added!" + status;
            self.action.color = "red";
        });
        self.addCategoryFlag = true;
    }

    self.loadCategories();
});