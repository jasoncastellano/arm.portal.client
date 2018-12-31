(function() {
'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('reports-config')
        .component('reportsConfig', {
            require: {
                parent: "^configCategory"
            },
            templateUrl: 'src/app/market-config/reports-config/reports-config.html',
            controller: "ReportsConfigController",
            controllerAs: "vm",
            bindings: {
                fileType: "<",
                isLoading: "<"
            },
        });
})();