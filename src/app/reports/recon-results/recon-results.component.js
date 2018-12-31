(function () {
    "use strict";


    var reconResults = {
        templateUrl: "src/app/reports/recon-results/recon-results.html",
        controller: "ReconResultsController",
        controllerAs: "vm",
        require: {
            parent: "^reports"
        }
    };

    angular
        .module("recon-results")
        .component("reconResults", reconResults);
})();