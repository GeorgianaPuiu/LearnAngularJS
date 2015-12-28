/*global angular, console*/
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
            link: function (scope, element, attrs, ngModel) {
                var inputElement, writtenChar, isWrittenCharOk;

                inputElement = element[0].childNodes[3];
                scope._inputName = attrs.name;

                ngModel.$render = function () {
                    inputElement.value = ngModel.$viewValue;
                };

                inputElement.onkeypress = function (event) {
                    writtenChar = event.which;
                    isWrittenCharOk = false;

                    switch (scope._elementType) {
                    case 'text':
                        isWrittenCharOk = isLetter(String.fromCharCode(writtenChar));
                        break;
                    case 'number':
                        isWrittenCharOk = isNumber(String.fromCharCode(writtenChar));
                        break;
                    }
                    if (!isWrittenCharOk) {
                        event.preventDefault();
                    }
                };

                inputElement.onblur = function () {
                    scope.$apply(function () {
                        ngModel.$setViewValue(inputElement.value, 'onblur');
                    });
                };
            }
        }
    }]);

    function isLetter(character) {
        var regex = /^[a-zA-Z]+$/;
        return regex.test(character);
    }

    function isNumber(character) {
        var regex = /^\d*\d+$/;
        return regex.test(character);
    }
})();