// JavaScript source code
/// <reference path="Scripts/angular.js" />
app = angular.module("TypeScr", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.router'])

//app.controller('HelloController'['$scope', function ($scope) {
//    $scope.name = "Calvin";
//}]);
app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })

        // nested list with custom controller
        .state('home.solution', {
            url: '/solution',
            templateUrl: 'partial-home-solution.html',
            controller: function ($scope) {
                $scope.solutions = ['Standard', 'Pro', 'Prime'];
            }
        })
        .state('home.service', {
            url: '/service',
            templateUrl: 'partial-home-service.html',
            controller: function ($scope) {
                $scope.services = ['Base', 'Gold', 'Platinium'];
            }
        })
        .state('home.technology', {
            url: '/technology',
            templateUrl: 'partial-home-technology.html',
            controller: function ($scope) {
                $scope.technologies = ['IOS', 'Android', 'Unix'];
            }
        })



        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                //'columnTwo@about': {
                //    templateUrl: 'table-data.html',
                //    controller: 'scotchController'
                //}
            }

        });

});

app.controller("HelloController", function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";

    $scope.name = "JD ";
    $scope.homeoption = false;
    $scope.Productsoption = false;
    $scope.Contactoption = false;
    $scope.Aboutoption = false;
    $scope.Careeroption = false;
    $scope.Newsoption = false;
       
});

app.controller("ContactUsWrapperCtrl", function ($uibModal, $log, $document) {
    var $ctrl = this;
    $ctrl.items = ['Address', 'Phone Number', 'Email'];

    $ctrl.animationsEnabled = true;

    $ctrl.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'ContactUS.html',
            controller: 'ContactUSCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $ctrl.openComponentModal = function () {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            component: 'contactUS',
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('modal-component dismissed at: ' + new Date());
        });
    };
});


app.controller('ContactUSCtrl', function ($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };

    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.component('contactUS', {
    templateUrl: 'ContactUS.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function () {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.items = $ctrl.resolve.items;
            $ctrl.selected = {
                item: $ctrl.items[0]
            };
        };

        $ctrl.ok = function () {
            $ctrl.close({ $value: $ctrl.selected.item });
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({ $value: 'cancel' });
        };
    }
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

