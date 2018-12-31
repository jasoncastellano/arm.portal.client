(function() {
    "use strict";

    var reportsSearch = {
        require: {
            parent: "^reports"
        },
        // bindings: {
        //     onSearch: "&"
        // },
        controller: "ReportsSearchController",
        controllerAs: "vm",
        templateUrl: "src/app/reports/reports-search/reports-search.html"
    };

   angular
       .module("app.reports")
       .component("reportsSearch", reportsSearch);
})();