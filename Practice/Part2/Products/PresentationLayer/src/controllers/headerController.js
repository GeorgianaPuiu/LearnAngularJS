(function(){
    'use strict';
    
    angular.module('app')
        .controller('HeaderCtrl', ['$location', HeaderCtrl]);

    function HeaderCtrl($location){
        self = this;
        
        self.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
    }
})();