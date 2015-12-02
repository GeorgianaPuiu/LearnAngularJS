app.controller('CategoryCtrl', ['CategoryService', function (CategoryService) {
    var self = this;

    self.isCategoryFormVisible = false;

    self.categories = CategoryService.query();
    
    self.submitCategoryForm = function () {
        var newCateg = new  CategoryService(self.newCategory);
        newCateg.$save().then(function(){
            self.categories = CategoryService.query(); 
        });    
        
        self.isCategoryFormVisible = false;
    };
}]);