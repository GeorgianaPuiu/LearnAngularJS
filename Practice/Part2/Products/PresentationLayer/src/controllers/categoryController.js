(function () {
    'use strict';
    angular.module('app')
        .controller('CategoryCtrl', ['CategoryService', CategoryCtrl]);

    function CategoryCtrl(CategoryService) {
        var self = this;

        self.isCategoryFormVisible = false;
        self.categories = CategoryService.query();
        self.submitCategoryForm = submitCategoryForm;

        function submitCategoryForm() {
            var newCateg = new CategoryService(self.newCategory);

            newCateg.$save().then(function () {
                self.categories = CategoryService.query();
                self.isCategoryFormVisible = false;
                self.newCategory = null;
            });
        }
    }
})();