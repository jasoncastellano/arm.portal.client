(function() {
'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('app.shared')
        .component('permalink', {
            templateUrl: 'src/app/shared/permalink/permalink.html',
            controller: "permalinkController",
            controllerAs: "vm",
            bindings: {
                linkUrl: "<"
            }
        });
})();