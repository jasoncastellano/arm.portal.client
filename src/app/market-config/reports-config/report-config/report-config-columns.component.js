(function() {
'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('reports-config')
        .component('reportConfigColumns', {
            require: {
                parent: '^report-config'
            },
            templateUrl: 'src/app/market-config/reports-config/report-config/report-config-columns.html',
            controller: 'ReportConfigColumnsController',
            controllerAs: 'vm',
            bindings: {
                columnType: '@'
            }
        });
})();