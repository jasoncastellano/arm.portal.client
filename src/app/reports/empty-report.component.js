(function() {
'use strict';

    // Usage:
    // Placeholder for an empty recon/sox report
    // Creates:
    // 

    angular
        .module('app.reports')
        .component('emptyReport', {
            template: '<div class="jumbotron" ng-show="vm.visible"><h1>{{vm.title}}</h1><h2>{{vm.description}}</h2></div>',
            controller: function () {
                var vm = this;
                vm.visible
            },
            controllerAs: "vm",
            bindings: {
                visible: "<",
                title: "@",
                description: "@"
            }
        });
})();