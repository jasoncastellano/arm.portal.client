(function() {
'use strict';

    var soxReport = {
        templateUrl: 'src/app/reports/sox-report/sox-report.html',
        controller: "SoxReportController",
        controllerAs: "vm",
        bindings: {
            "showSearch": "<"
        }
    };

    angular
        .module('app.reports')
        .component('soxReport', soxReport);
})();