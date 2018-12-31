(function () {
    "use strict";


    var reports = {
        templateUrl: "src/app/reports/reports.html",
        controller: "ReportsController",
        controllerAs: "vm",
        bindings: {
            marketId: "<",
            reportConfigId: "<",
            reconRunId: "<"
        }
    };

    angular
        .module("app.reports")
        .component("reports", reports);
})();