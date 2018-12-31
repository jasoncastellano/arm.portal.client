(function() {
'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('reports-config')
        .component('reportConfig', {
            require: {
                parent: "^reportsConfig"
            },
            templateUrl: 'src/app/market-config/reports-config/report-config/report-config.html',
            controller: "ReportConfigController",
            controllerAs: "vm",
            bindings: {
                config: "<"
            },
        });
})();