// JavaScript source code
/// <reference path="Scripts/angular.js" />
app = angular.module("TypeScr", [])

//app.controller('HelloController'['$scope', function ($scope) {
//    $scope.name = "Calvin";
//}]);

app.controller("HelloController", function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";

    $scope.name = "JD ";
});

app.directive('home', function () {
    return {
        restrict: 'EA',
        scope : '=',
        controller: function ($scope) {
            $scope.name = "JD123";
        },
         template: '<input type="text" value="{{name}}"/><br/>{{name}}'
    }
});

