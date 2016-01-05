/*global angular*/
(function () {
    'use strict';
    angular.module('app').directive('myDirectiveInput', [function () {
        return {
            restrict: 'E',
            require: 'ngModel',
            replace: true,
            scope: {
                _labelText: '@labelText',
                _elementType: '@elementType',
                _cssClass: '@cssClass'
            },
            templateUrl: 'partials/myDirectiveInput.html',
            link: function (scope, element, attrs, ngModelCtrl) {
                var inputElement;

                inputElement = element[0].childNodes[3];
                scope._inputName = attrs.name;

                ngModelCtrl.$render = function () {
                    scope.ngModel = ngModelCtrl.$modelValue; // do not use inputElement.value                        
                };

                inputElement.onkeypress = function (event) {
                    var typedChar = String.fromCharCode(event.which);
                    if (!isValid(typedChar, scope._elementType)) {
                        event.preventDefault();
                    }
                };

                inputElement.onblur = function () {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(scope.ngModel, 'onblur');
                    });
                };
            }
        };
    }]);

    function isValid(character, type) {
        if (character) {
            switch (type) {
            case 'text':
                return isLetter(character);
            case 'number':
                return isNumber(character);
            default:
                return false;
            }
        }
        return false;
    }

    function isLetter(character) {
        var regex = /^[a-zA-Z]+$/;
        return regex.test(character);
    }

    function isNumber(character) {
        var regex = /^\d*\d+$/;
        return regex.test(character);
    }
})();